export default function TopStats({ stats }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div className="bg-[#0f172a]/60 backdrop-blur-[12px] border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 flex flex-col gap-2 transition-all duration-500">
        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium uppercase tracking-wide">
          <div className="p-2 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400 shadow-[inset_0_0_15px_rgba(34,211,238,0.15)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </div>
          Active Assets
        </div>
        <div className="text-4xl font-bold text-white leading-tight">{stats.monitoredMedia}</div>
      </div>

      <div className="bg-[#0f172a]/60 backdrop-blur-[12px] border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 flex flex-col gap-2 transition-all duration-500 relative overflow-hidden group hover:border-rose-500/30">
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/10 transition-colors"></div>
        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium uppercase tracking-wide z-10">
          <div className="p-2 rounded-lg bg-white/5 flex items-center justify-center text-rose-500 shadow-[inset_0_0_15px_rgba(244,63,94,0.15)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          Live Violations
        </div>
        <div className="text-4xl font-bold text-white leading-tight z-10 flex items-baseline gap-3">
          <span className="animate-pulse">{stats.activeViolations}</span>
          {stats.activeViolations > 0 && <span className="text-sm font-medium text-rose-500 tracking-wide uppercase">Detections Caught</span>}
        </div>
      </div>

      <div className="bg-[#0f172a]/60 backdrop-blur-[12px] border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-6 flex flex-col gap-2 transition-all duration-500">
        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium uppercase tracking-wide">
          <div className="p-2 rounded-lg bg-white/5 flex items-center justify-center text-purple-500 shadow-[inset_0_0_15px_rgba(168,85,247,0.15)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          </div>
          System Confidence
        </div>
        <div className="text-4xl font-bold text-white leading-tight">{stats.confidenceScore}</div>
      </div>

    </div>
  );
}
