
import { Worker, Queue } from "bullmq";
import Redis from "ioredis";
import prisma from "../config/prisma";
import nodemailer from "nodemailer";
import { checkHourlyLimit } from "../utils/rateLimiter";


const connection = new Redis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});


const emailQueue = new Queue("email-queue", {
  connection,
});


export const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    const { emailId } = job.data;

    
    const email = await prisma.email.findUnique({
      where: { id: emailId },
    });

    if (!email) {
      console.log("Email not found, skipping");
      return;
    }

    
    const rate = await checkHourlyLimit(email.userEmail);

    if (!rate.allowed) {
      const delay = rate.resetAt - Date.now() + 1000;

      console.log(
        `⏱ Rate limit hit for ${email.userEmail}. Rescheduling email ${email.id}`
      );

      
      await emailQueue.add(
        "send-email",
        { emailId: email.id },
        { delay }
      );

      return;
    }

    
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS,
      },
    });

    
    await transporter.sendMail({
      from: `"Email Scheduler" <${process.env.ETHEREAL_USER}>`,
      to: email.to,
      subject: email.subject,
      text: email.body,
    });

    
    await prisma.email.update({
      where: { id: email.id },
      data: { status: "SENT" },
    });

    console.log(`✅ Email sent to ${email.to}`);
  },
  {
    connection,
    concurrency: 5,

    
    limiter: {
      max: 1,
      duration: Number(process.env.MIN_DELAY_BETWEEN_EMAILS_MS),
    },
  }
);
