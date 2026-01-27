
type Props = {
  children: React.ReactNode;
};

function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-white">
              Email Scheduler
            </h1>
            <p className="text-sm text-blue-100">
              Schedule, send & track emails
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
              U
            </div>
            <div className="text-sm">
              <div className="text-white font-medium">
                Guest User
              </div>
              <div className="text-blue-100 text-xs">
                guest@email.com
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}

export default AppLayout;
