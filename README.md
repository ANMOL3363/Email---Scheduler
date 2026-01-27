
# Email Scheduler Service

A production-grade email scheduling system built using TypeScript, BullMQ, Redis, PostgreSQL, and React.

This project demonstrates how real-world email systems schedule, throttle, and send emails reliably without cron jobs, while ensuring persistence, rate limiting, and fault tolerance.

---

## Features

- Schedule emails for a specific future time
- Persistent background job scheduling using BullMQ + Redis
- Rate limiting (maximum emails per hour)
- Controlled delay between individual email sends
- Automatic rescheduling when rate limits are exceeded
- Google OAuth authentication
- Dashboard to view scheduled and sent emails
- CSV upload for bulk email scheduling
- Reliable processing across server restarts

---

## Feature Breakdown

### Backend
- Email scheduling using BullMQ delayed jobs
- Persistent job storage using Redis (no cron jobs)
- PostgreSQL persistence for email state and metadata
- Rate limiting (max emails per hour)
- Controlled concurrency and delay between email sends
- Automatic rescheduling when limits are exceeded
- Background worker for reliable email processing
- Safe handling of restarts without duplicate emails

### Frontend
- Google OAuth login
- User dashboard
- Compose email interface
- CSV upload for bulk scheduling
- Scheduled emails table
- Sent emails table

---

## Tech Stack

### Backend
- TypeScript
- Node.js + Express
- BullMQ (Redis-backed job queue)
- Redis
- PostgreSQL
- Prisma ORM
- Nodemailer
- Google OAuth + JWT authentication

### Frontend
- React + Vite
- TypeScript
- Tailwind CSS

---

## Architecture Overview

Client (React)  
→ REST API (JWT Auth)  
→ Express Backend  
→ PostgreSQL (email metadata & state)  
→ BullMQ Queue (Redis)  
→ Worker  
→ SMTP (Ethereal Email)

---

## Email Scheduling Flow

1. User logs in using Google OAuth
2. User schedules emails (single or via CSV upload)
3. Backend stores email metadata in PostgreSQL
4. Backend schedules delayed jobs in BullMQ
5. Worker executes jobs at scheduled time
6. Rate limits and delays are enforced
7. Emails are sent via SMTP
8. Email status is updated in the database

---

## Rate Limiting & Concurrency

- Rate limiting is configured using environment variables:
  - MAX_EMAILS_PER_HOUR
  - MIN_DELAY_BETWEEN_EMAILS_MS
- Redis is used to track per-hour email counters
- If rate limit is exceeded:
  - The job is not dropped
  - The job is delayed to the next available window
- Controlled concurrency ensures safe execution across workers

---

## Persistence on Restart

- BullMQ persists jobs in Redis
- Email state is stored in PostgreSQL
- On backend or worker restart:
  - Scheduled jobs resume automatically
  - Sent emails are not duplicated
  - Pending emails continue from last safe state

No cron jobs are used. All scheduling and retries are handled entirely by BullMQ.

---

## AI Usage

AI tools were used as a productivity aid to assist with debugging, refactoring, and documentation, similar to using documentation or IDE tooling.

- Debugging BullMQ, Redis, and worker execution issues
- Validating rate-limiting and delayed job behavior
- Refactoring TypeScript code for readability and maintainability
- Improving error handling and logging
- Assisting with README structure and documentation clarity

---

## Environment Variables

### Backend (.env)

PORT=4000  
DATABASE_URL=postgresql://...  
REDIS_HOST=localhost  
REDIS_PORT=6379  

GOOGLE_CLIENT_ID=...  
GOOGLE_CLIENT_SECRET=...  

JWT_SECRET=...  

ETHEREAL_USER=...  
ETHEREAL_PASS=...  

MAX_EMAILS_PER_HOUR=20  
MIN_DELAY_BETWEEN_EMAILS_MS=2000  

---

## Ethereal Email Setup

1. Visit https://ethereal.email
2. Create a test account
3. Copy SMTP credentials
4. Add credentials to backend .env
5. View sent emails in Ethereal dashboard

---

## How to Run Locally

### Start Services
docker start email-scheduler-postgres  
docker start email-scheduler-redis  

### Backend
cd Backend  
npm install  
npm run dev  

### Worker
npm run worker  

### Frontend
cd frontend  
npm install  
npm run dev  

---

## Outcome

This project demonstrates practical experience in building a scalable email scheduling system with background processing, rate limiting, persistence, and clean backend/frontend separation.

Status: Submission Ready
