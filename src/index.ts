import "dotenv/config";
import express, {type Request, type Response} from "express";
import {AuditLogsRepository} from "./auditLogsRepository.js";

const app = express();
app.use(express.json());

const PORT = 3000;

const auditLogsRepository = new AuditLogsRepository();

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send({});
});

app.get("/api/audit-logs", async (req: Request, res: Response) => {
  res.status(200).send(await auditLogsRepository.getAuditLogs());
});

app.post("/api/audit-logs", async (req: Request, res: Response) => {
  res.status(200).send(
    await auditLogsRepository.addAuditLog({
      event_type: req.body.event_type,
      payload: req.body.payload,
    })
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
