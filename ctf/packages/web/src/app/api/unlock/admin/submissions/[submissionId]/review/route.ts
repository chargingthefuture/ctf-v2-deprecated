import { NextResponse } from 'next/server';
import { requireUnlockAdminAccess, unlockErrorResponse } from '@/src/app/api/unlock/_lib';
import { insertUnlockAudit, reviewUnlockSubmission } from '@/src/lib/unlock/repository';
import type { ReviewUnlockSubmissionInput } from '@/src/lib/unlock/types';

type RouteParams = {
  params: Promise<{
    submissionId: string;
  }>;
};

type ReviewBody = {
  reviewStatus?: ReviewUnlockSubmissionInput['reviewStatus'];
  reviewNote?: string;
};

const ALLOWED_REVIEW_STATUSES = new Set<ReviewUnlockSubmissionInput['reviewStatus']>(['approved', 'rejected', 'spam']);

export async function POST(request: Request, { params }: RouteParams) {
  const gate = await requireUnlockAdminAccess();
  if (!gate.allowed) {
    return gate.response;
  }

  const resolvedParams = await params;
  const submissionId = Number(resolvedParams.submissionId);
  if (!Number.isInteger(submissionId) || submissionId <= 0) {
    return unlockErrorResponse('submissionId must be a positive integer.', 400);
  }

  let body: ReviewBody;
  try {
    body = (await request.json()) as ReviewBody;
  } catch {
    return unlockErrorResponse('Invalid JSON payload.', 400);
  }

  if (!body.reviewStatus || !ALLOWED_REVIEW_STATUSES.has(body.reviewStatus)) {
    return unlockErrorResponse('reviewStatus must be approved, rejected, or spam.', 400);
  }

  try {
    const submission = await reviewUnlockSubmission({
      actorUserId: gate.auth.userId,
      submissionId,
      reviewStatus: body.reviewStatus,
      reviewNote: body.reviewNote,
    });

    if (!submission) {
      return unlockErrorResponse('Unlock submission not found.', 404);
    }

    await insertUnlockAudit({
      actorUserId: gate.auth.userId,
      command: 'unlock.admin.submission.review',
      policyStatus: 'allow',
      reason: 'ok',
      targetUserId: submission.userId,
      metadata: {
        submissionId,
        reviewStatus: body.reviewStatus,
      },
    });

    return NextResponse.json({ ok: true, submission });
  } catch {
    return unlockErrorResponse('Unlock submission review unavailable.', 503);
  }
}
