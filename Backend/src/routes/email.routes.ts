
import { Router } from "express";
import {
  scheduleEmail,
  getScheduledEmails,
  getSentEmails,
} from "../controllers/email.controller";

const router = Router();

import { authMiddleware } from "../middlewares/auth.middleware";

router.post("/schedule", authMiddleware, scheduleEmail);
router.get("/scheduled", authMiddleware, getScheduledEmails);
router.get("/sent", authMiddleware, getSentEmails);


export default router;
