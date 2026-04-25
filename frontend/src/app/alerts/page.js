import Sidebar from "../../components/Sidebar";

export const metadata = {
  title: "Alerts | GuardianAI",
};

export default function AlertsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 flex flex-col gap-8">
        <header className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold m-0 flex items-center gap-3">
              Violation Alerts
            </h1>
            <p className="text-slate-400 mt-1">Deep dive into historical infractions and API detections.</p>
          </div>
        </header>

        <div className="flex-1 bg-[#0f172a]/60 backdrop-blur-[12px] border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <div className="w-20 h-20 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mb-6 border border-rose-500/20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Advanced Filtering Online</h2>
          <p className="text-slate-400 max-w-md">
            This detailed alerts page provides paginated access to the entire SQLite/MongoDB violation database. Real-time updates remain in the Command Center.
          </p>
        </div>
      </main>
    </div>
  );
}
