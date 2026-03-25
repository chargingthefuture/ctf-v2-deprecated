import { queryDb } from '@/src/lib/db/postgres';
import type {
  CreateUnlockSubmissionInput,
  ReviewUnlockSubmissionInput,
  UnlockDashboardSnapshot,
  UnlockQueueFilters,
  UnlockSubmission,
} from './types';

type UnlockSubmissionRow = {
  id: number;
  user_id: string;
  quora_profile_url: string;
  quora_profile_url_normalized: string;
  review_status: UnlockSubmission['reviewStatus'];
  access_tier: UnlockSubmission['accessTier'];
  unlock_window_expires_at: Date;
  reminder_stage: number;
  reviewed_by_user_id: string | null;
  reviewed_at: Date | null;
  review_note: string | null;
  incentive_granted_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

type UnlockDashboardRow = {
  pending_count: string;
  approved_count: string;
  rejected_count: string;
  spam_count: string;
  locked_support_only_count: string;
};

function mapUnlockSubmission(row: UnlockSubmissionRow): UnlockSubmission {
  return {
    id: row.id,
    userId: row.user_id,
    quoraProfileUrl: row.quora_profile_url,
    quoraProfileUrlNormalized: row.quora_profile_url_normalized,
    reviewStatus: row.review_status,
    accessTier: row.access_tier,
    unlockWindowExpiresAt: row.unlock_window_expires_at.toISOString(),
    reminderStage: row.reminder_stage,
    reviewedByUserId: row.reviewed_by_user_id,
    reviewedAt: row.reviewed_at ? row.reviewed_at.toISOString() : null,
    reviewNote: row.review_note,
    incentiveGrantedAt: row.incentive_granted_at ? row.incentive_granted_at.toISOString() : null,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export async function createOrUpdateUnlockSubmission(input: CreateUnlockSubmissionInput): Promise<UnlockSubmission> {
  const runtimeConfig = await queryDb<{ submission_window_hours: number }>(
    'SELECT submission_window_hours FROM unlock_runtime_config WHERE singleton_id = 1 LIMIT 1',
  );

  const submissionWindowHours = runtimeConfig.rows[0]?.submission_window_hours ?? 168;

  const result = await queryDb<UnlockSubmissionRow>(
    `INSERT INTO unlock_verification_submissions (
       user_id,
       quora_profile_url,
       quora_profile_url_normalized,
       review_status,
       access_tier,
       unlock_window_expires_at
     )
     VALUES (
       $1,
       $2,
       $3,
       'pending',
       'pending_readonly',
       NOW() + (($4::text || ' hours')::interval)
     )
     ON CONFLICT (user_id) DO UPDATE
     SET
       quora_profile_url = EXCLUDED.quora_profile_url,
       quora_profile_url_normalized = EXCLUDED.quora_profile_url_normalized,
       review_status = 'pending',
       access_tier = 'pending_readonly',
       reviewed_by_user_id = NULL,
       reviewed_at = NULL,
       review_note = NULL,
       reminder_stage = 0,
       updated_at = NOW()
     RETURNING
       id,
       user_id,
       quora_profile_url,
       quora_profile_url_normalized,
       review_status,
       access_tier,
       unlock_window_expires_at,
       reminder_stage,
       reviewed_by_user_id,
       reviewed_at,
       review_note,
       incentive_granted_at,
       created_at,
       updated_at`,
    [input.userId, input.quoraProfileUrl, input.quoraProfileUrlNormalized, String(submissionWindowHours)],
  );

  return mapUnlockSubmission(result.rows[0]);
}

export async function listUnlockSubmissions(filters: UnlockQueueFilters = {}): Promise<UnlockSubmission[]> {
  const values: unknown[] = [];
  const whereParts: string[] = [];

  if (filters.reviewStatus) {
    values.push(filters.reviewStatus);
    whereParts.push(`review_status = $${values.length}`);
  }

  if (filters.accessTier) {
    values.push(filters.accessTier);
    whereParts.push(`access_tier = $${values.length}`);
  }

  values.push(Math.min(Math.max(filters.limit ?? 100, 1), 200));

  const whereClause = whereParts.length > 0 ? `WHERE ${whereParts.join(' AND ')}` : '';
  const result = await queryDb<UnlockSubmissionRow>(
    `SELECT
       id,
       user_id,
       quora_profile_url,
       quora_profile_url_normalized,
       review_status,
       access_tier,
       unlock_window_expires_at,
       reminder_stage,
       reviewed_by_user_id,
       reviewed_at,
       review_note,
       incentive_granted_at,
       created_at,
       updated_at
     FROM unlock_verification_submissions
     ${whereClause}
     ORDER BY created_at DESC
     LIMIT $${values.length}`,
    values,
  );

  return result.rows.map(mapUnlockSubmission);
}

export async function reviewUnlockSubmission(input: ReviewUnlockSubmissionInput): Promise<UnlockSubmission | null> {
  const accessTier = input.reviewStatus === 'approved' ? 'approved_full' : 'locked_support_only';

  const result = await queryDb<UnlockSubmissionRow>(
    `UPDATE unlock_verification_submissions
     SET
       review_status = $1,
       access_tier = $2,
       reviewed_by_user_id = $3,
       reviewed_at = NOW(),
       review_note = $4,
       updated_at = NOW()
     WHERE id = $5
     RETURNING
       id,
       user_id,
       quora_profile_url,
       quora_profile_url_normalized,
       review_status,
       access_tier,
       unlock_window_expires_at,
       reminder_stage,
       reviewed_by_user_id,
       reviewed_at,
       review_note,
       incentive_granted_at,
       created_at,
       updated_at`,
    [input.reviewStatus, accessTier, input.actorUserId, input.reviewNote ?? null, input.submissionId],
  );

  if (result.rowCount === 0) {
    return null;
  }

  return mapUnlockSubmission(result.rows[0]);
}

export async function getUnlockDashboardSnapshot(): Promise<UnlockDashboardSnapshot> {
  const result = await queryDb<UnlockDashboardRow>(
    `SELECT
       COUNT(*) FILTER (WHERE review_status = 'pending')::text AS pending_count,
       COUNT(*) FILTER (WHERE review_status = 'approved')::text AS approved_count,
       COUNT(*) FILTER (WHERE review_status = 'rejected')::text AS rejected_count,
       COUNT(*) FILTER (WHERE review_status = 'spam')::text AS spam_count,
       COUNT(*) FILTER (WHERE access_tier = 'locked_support_only')::text AS locked_support_only_count
     FROM unlock_verification_submissions`,
  );

  const row = result.rows[0];

  return {
    pendingCount: Number(row?.pending_count ?? 0),
    approvedCount: Number(row?.approved_count ?? 0),
    rejectedCount: Number(row?.rejected_count ?? 0),
    spamCount: Number(row?.spam_count ?? 0),
    lockedSupportOnlyCount: Number(row?.locked_support_only_count ?? 0),
  };
}

export async function insertUnlockAudit(input: {
  actorUserId: string | null;
  command: string;
  policyStatus: 'allow' | 'deny';
  reason: string;
  targetUserId?: string | null;
  requestId?: string | null;
  metadata?: Record<string, unknown>;
}) {
  await queryDb(
    `INSERT INTO unlock_audit_log (
       actor_user_id,
       command,
       policy_status,
       reason,
       target_user_id,
       request_id,
       metadata
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)`,
    [
      input.actorUserId,
      input.command,
      input.policyStatus,
      input.reason,
      input.targetUserId ?? null,
      input.requestId ?? null,
      JSON.stringify(input.metadata ?? {}),
    ],
  );
}
