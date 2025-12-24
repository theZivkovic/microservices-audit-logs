import "dotenv/config";
import express, {type Request, type Response} from "express";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({});
});

app.get("/api/audit-logs", async (req: Request, res: Response) => {
  res.send([]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
