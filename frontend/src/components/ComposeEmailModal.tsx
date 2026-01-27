
import { useState } from "react";
import { scheduleEmails } from "../api/emailApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onScheduled: () => void;
}

export default function ComposeEmailModal({
  isOpen,
  onClose,
  onScheduled,
}: Props) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [sendAt, setSendAt] = useState("");
  const [delayMs, setDelayMs] = useState(2000);
  const [hourlyLimit, setHourlyLimit] = useState(20);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCSVUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const lines = text.split(/\r?\n/);
      setEmails(lines.map(l => l.trim()).filter(l => l.includes("@")));
    };
    reader.readAsText(file);
  };

  const handleSchedule = async () => {
    setLoading(true);
    try {
      await scheduleEmails({
        subject,
        body,
        emails,
        sendAt: new Date(sendAt).toISOString(),
        delayMs,
        hourlyLimit,
      });
      onScheduled();
      onClose();
    } catch {
      alert("Failed to schedule emails");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold">Compose Email</h3>

        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="file"
          accept=".csv"
          onChange={(e) =>
            e.target.files && handleCSVUpload(e.target.files[0])
          }
        />

        {emails.length > 0 && <p>{emails.length} emails detected</p>}

        <input
          type="datetime-local"
          value={sendAt}
          onChange={(e) => setSendAt(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="number"
          value={delayMs}
          onChange={(e) => setDelayMs(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="number"
          value={hourlyLimit}
          onChange={(e) => setHourlyLimit(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSchedule}
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Scheduling..." : "Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
}
