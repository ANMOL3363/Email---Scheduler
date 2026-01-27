
type EmailRow = {
  id: string;
  to: string;
  subject: string;
  time: string;
  status: string;
};

interface Props {
  emails: EmailRow[];
}

export default function EmailTable({ emails }: Props) {
  if (emails.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-gray-500">
        No emails found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase">
            <th className="px-4 py-3">To</th>
            <th className="px-4 py-3">Subject</th>
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {emails.map((email) => (
            <tr
              key={email.id}
              className="border-b last:border-none hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 text-sm text-gray-800">
                {email.to}
              </td>
              <td className="px-4 py-3 text-sm text-gray-800">
                {email.subject}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {email.time}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    email.status === "SENT"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
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
