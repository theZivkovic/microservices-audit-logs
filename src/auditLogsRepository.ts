import {Pool} from "pg";
import type {AuditLog} from "./auditLog.js";

class AuditLogsRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
    });
  }

  async getAuditLogs() {
    const result = await this.pool.query<AuditLog>("select * from audit_logs");
    return result.rows;
  }

  async addAuditLog(item: Omit<AuditLog, "id" | "created_at">) {
    const result = await this.pool.query<AuditLog>(
      "INSERT INTO audit_logs(event_type, payload) VALUES($1, $2) RETURNING *",
      [item.event_type, item.payload]
    );
    console.log(result.rows[0]);
    return result.rows[0];
  }
}

const auditLogsRepository = new AuditLogsRepository();
export {auditLogsRepository};
