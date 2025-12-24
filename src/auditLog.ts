export type AuditLog = {
  id: string;
  event_type: string;
  payload: object;
  created_at: Date;
};
