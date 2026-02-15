import type { InsertModerationReport, ModerationReport } from '@shared/schema';

export interface IModerationStorage {
  createModerationReport(report: InsertModerationReport): Promise<ModerationReport>;
  getAllModerationReports(): Promise<ModerationReport[]>;
  updateModerationReportStatus(id: string, status: string, resolution?: string): Promise<ModerationReport>;
  getModerationPendingCount(): Promise<number>;
}

export type { InsertModerationReport, ModerationReport };
