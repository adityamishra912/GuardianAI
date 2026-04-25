import Sidebar from "../../components/Sidebar";

export const metadata = {
  title: "Reports | GuardianAI",
};

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 flex flex-col gap-8">
        <header className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold m-0 flex items-center gap-3">
              Analytics & Reports
            </h1>
            <p className="text-slate-400 mt-1">Generate automated legal reports and system performance analytics.</p>
          </div>
          <button className="bg-transparent text-white border border-white/10 px-4 py-2 rounded-lg transition-all hover:bg-cyan-400/5 hover:border-cyan-400 hover:text-cyan-400">
            Export .CSV
          </button>
        </header>

        <div className="flex-1 bg-[#0f172a]/60 backdrop-blur-[12px] border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          <div className="w-20 h-20 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mb-6 border border-purple-500/20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Data Engine Connecting</h2>
          <p className="text-slate-400 max-w-md">
            The reporting module is currently synthesizing data. Visual graphs, charts, and Gemini-powered summary exports will be available once the backend API fully integrates.
          </p>
        </div>
      </main>
    </div>
  );
}
