
type Tab = "scheduled" | "sent";

type Props = {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
};

function Tabs({ activeTab, onChange }: Props) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onChange("scheduled")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition ${
          activeTab === "scheduled"
            ? "bg-indigo-50 text-indigo-700"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Scheduled Emails
      </button>

      <button
        onClick={() => onChange("sent")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition ${
          activeTab === "sent"
            ? "bg-green-50 text-green-700"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Sent Emails
      </button>
    </div>
  );
}

export default Tabs;
