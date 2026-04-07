import express from "express";
import { HealthCheckResponse } from "@workspace/api-zod";

const router = express.Router();

router.get("/healthz", (_req: express.Request, res: express.Response) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.status(200).send(data);
});

export default router;
