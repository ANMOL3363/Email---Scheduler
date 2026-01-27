
import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { AuthRequest } from "../middlewares/auth.middleware";
import prisma from "../config/prisma";
import { emailQueue } from "../queues/email.queue";

/**
 * Schedule a new email
 */
export const scheduleEmail = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { to, subject, body, sendAt } = req.body;

    if (!to || !subject || !body || !sendAt) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const user = req.user; // from JWT

    const email = await prisma.email.create({
      data: {
        id: uuidv4(),
        to,
        subject,
        body,
        sendAt: new Date(sendAt),
        status: "SCHEDULED",
        userEmail: user.email, // link email to user
      },
    });

    const delay =
      new Date(sendAt).getTime() - Date.now();

    await emailQueue.add(
      "send-email",
      { emailId: email.id },
      { delay: Math.max(delay, 0) }
    );

    return res.status(201).json({
      message: "Email scheduled successfully",
      email,
    });
  } catch (error) {
    console.error("Schedule email error:", error);
    return res.status(500).json({
      message: "Failed to schedule email",
    });
  }
};

/**
 * Get scheduled emails for logged-in user
 */
export const getScheduledEmails = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = req.user;

    const emails = await prisma.email.findMany({
      where: {
        userEmail: user.email,
        status: "SCHEDULED",
      },
      orderBy: {
        sendAt: "asc",
      },
    });

    return res.json({ emails });
  } catch (error) {
    console.error("Fetch scheduled emails error:", error);
    return res.status(500).json({
      message: "Failed to fetch scheduled emails",
    });
  }
};

/**
 * Get sent emails for logged-in user
 */
export const getSentEmails = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = req.user;

    const emails = await prisma.email.findMany({
      where: {
        userEmail: user.email,
        status: "SENT",
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return res.json({ emails });
  } catch (error) {
    console.error("Fetch sent emails error:", error);
    return res.status(500).json({
      message: "Failed to fetch sent emails",
    });
  }
};
