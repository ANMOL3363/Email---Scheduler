
const API_BASE = "http://localhost:4000";

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("auth_token");

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return res.json();
};
