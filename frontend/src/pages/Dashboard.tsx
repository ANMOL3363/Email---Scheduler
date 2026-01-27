
import { useEffect, useState } from "react";
import Tabs from "../components/Tabs";
import EmailTable from "../components/EmailTable";
import ComposeEmailModal from "../components/composeEmailmodal";
import {
  fetchScheduledEmails,
  fetchSentEmails,
} from "../api/emailApi";

type TabType = "scheduled" | "sent";

type ApiScheduledEmail = {
  id: string;
  to: string;
  subject: string;
  sendAt: string;
  status: string;
};

type ApiSentEmail = {
  id: string;
  to: string;
  subject: string;
  createdAt: string;
  status: string;
};

type TableEmail = {
  id: string;
  to: string;
  subject: string;
  time: string;
  status: string;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("scheduled");
  const [scheduled, setScheduled] = useState<TableEmail[]>([]);
  const [sent, setSent] = useState<TableEmail[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const loadEmails = async () => {
    setLoading(true);
    try {
      const scheduledRaw: ApiScheduledEmail[] =
        await fetchScheduledEmails();
      const sentRaw: ApiSentEmail[] = await fetchSentEmails();

      const scheduledFormatted: TableEmail[] = scheduledRaw.map(
        (e) => ({
          id: e.id,
          to: e.to,
          subject: e.subject,
          time: new Date(e.sendAt).toLocaleString(),
          status: e.status,
        })
      );

      const sentFormatted: TableEmail[] = sentRaw.map((e) => ({
        id: e.id,
        to: e.to,
        subject: e.subject,
        time: new Date(e.createdAt).toLocaleString(),
        status: e.status,
      }));

      setScheduled(scheduledFormatted);
      setSent(sentFormatted);
    } catch {
      console.error("Failed to load emails");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmails();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          + Compose Email
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl border">
        <Tabs activeTab={activeTab} onChange={setActiveTab} />

        {loading && <p>Loading...</p>}

        {!loading && activeTab === "scheduled" && (
          <EmailTable emails={scheduled} />
        )}

        {!loading && activeTab === "sent" && (
          <EmailTable emails={sent} />
        )}
      </div>

      <ComposeEmailModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onScheduled={loadEmails}
      />
    </div>
  );
}
