import { saveAuditLog, AuditLogEntry } from './store';

export interface AuditLogOptions {
  adminUid: string;
  action: string;
  targetId?: string;
  payload?: Record<string, unknown>;
}

export async function logAdminAction(options: AuditLogOptions): Promise<AuditLogEntry> {
  const entry: AuditLogEntry = {
    adminUid: options.adminUid,
    action: options.action,
    targetId: options.targetId || '',
    timestamp: new Date().toISOString(),
    payload: options.payload || {},
  };

  return await saveAuditLog(entry);
}
