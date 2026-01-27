
import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

export const emailQueue = new Queue("email-queue", {
  connection,
});
