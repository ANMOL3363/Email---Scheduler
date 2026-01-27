
const API_BASE = "http://localhost:4000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("auth_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const fetchScheduledEmails = async () => {
  const res = await fetch(`${API_BASE}/api/emails/scheduled`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed");
  const data = await res.json();
  return data.emails;
};

export const fetchSentEmails = async () => {
  const res = await fetch(`${API_BASE}/api/emails/sent`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed");
  const data = await res.json();
  return data.emails;
};

export const scheduleEmails = async (payload: {
  subject: string;
  body: string;
  emails: string[];
  sendAt: string;
  delayMs: number;
  hourlyLimit: number;
}) => {
  const res = await fetch(`${API_BASE}/api/emails/schedule`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to schedule emails");
  }

  return res.json();
};

