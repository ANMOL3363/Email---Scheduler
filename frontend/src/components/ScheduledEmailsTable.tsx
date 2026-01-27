
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

interface Email {
  id: string;
  to: string;
  subject: string;
  sendAt: string;
  status: string;
}

export default function ScheduledEmailsTable() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const data = await apiFetch("/api/emails/scheduled");
        setEmails(data.emails);
      } catch {
        console.error("Failed to load scheduled emails");
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading scheduled emails...</p>;
  }

  if (emails.length === 0) {
    return <p className="text-gray-500">No scheduled emails</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Scheduled Emails</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">To</th>
            <th className="py-2">Subject</th>
            <th className="py-2">Send Time</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {emails.map((email) => (
            <tr key={email.id} className="border-b last:border-none">
              <td className="py-2">{email.to}</td>
              <td className="py-2">{email.subject}</td>
              <td className="py-2">
                {new Date(email.sendAt).toLocaleString()}
              </td>
              <td className="py-2">
                <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                  {email.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
