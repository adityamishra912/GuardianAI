export default function AlertsFeed({ footprints = [] }) {
  return (
    <div className="bg-[#0f172a]/60 backdrop-blur-[12px] border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex flex-col gap-6 p-6 h-full">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-rose-500" strokeWidth="2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            Recently Fingerprinted
          </h2>
          {/* {lastUpdated && <span className="text-xs text-slate-500 font-medium">Last updated: {lastUpdated}</span>} */}
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-500 text-xs font-bold tracking-wide uppercase border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulseLive"></div>
          LIVE Monitoring
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-2">

        { /* {alerts.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-center p-8 border-2 border-dashed border-white/5 rounded-xl bg-black/10">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-lg font-semibold text-white mb-2">No threats detected</h3>
            <p className="text-slate-400 text-sm">System actively monitoring your assets globally...</p>
            <div className="mt-6 flex justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse delay-75"></div>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse delay-150"></div>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse delay-300"></div>
            </div>
          </div>
        ) : (
          alerts.map((alert, index) => (
            <div 
              key={alert.id} 
              className={`bg-black/20 border border-white/10 rounded-xl p-5 flex flex-col gap-4 transition-all duration-300 ${alert.hoverBorder} hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] animate-slideUp`}
              style={{ animationDelay: `${(index % 5) * 0.1}s` }}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 font-medium text-sm">
                  <div className={`w-6 h-6 flex items-center justify-center rounded-md font-bold text-xs ${alert.platformColor}`}>{alert.platform}</div>
                  <div>
                    {alert.user}
                    <div className="text-xs text-slate-400 mt-0.5">Detected {alert.time} • ID: {alert.id}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-2xl font-bold ${alert.textColor} drop-shadow-md`}>{alert.score}</span>
                  <span className="text-[10px] text-slate-400 tracking-wider font-semibold uppercase">{alert.type}</span>
                </div>
              </div>

              <div className="w-full relative h-1.5 bg-white/5 rounded-full overflow-hidden mt-1 cursor-help" title={`Confidence score: ${alert.score}`}>
                <div 
                  className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out`} 
                  style={{ width: alert.score, backgroundColor: `var(--color-${alert.baseColor}, currentColor)` }} 
                  // Fallback for standard inline styling
                  {...(alert.baseColor === 'cyan-400' && {style: {width: alert.score, backgroundColor: '#22d3ee'}})}
                  {...(alert.baseColor === 'rose-500' && {style: {width: alert.score, backgroundColor: '#f43f5e'}})}
                  {...(alert.baseColor === 'purple-500' && {style: {width: alert.score, backgroundColor: '#a855f7'}})}
                ></div>
                <div 
                  className="absolute top-0 h-full w-4 bg-white/40 blur-sm mix-blend-overlay"
                  style={{ left: `calc(${alert.score} - 10px)` }}
                ></div>
              </div>
              
              <div className="flex gap-4 items-center mt-2">
                <div className="flex-1 rounded-lg overflow-hidden relative bg-[#111] aspect-video border border-white/5">
                  <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] uppercase font-bold text-slate-300">Original</span>
                </div>
                <div className="flex flex-col items-center text-slate-400 px-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${alert.textColor} mb-1 drop-shadow-lg`}><polyline points="18 15 12 9 6 15"></polyline></svg>
                  <span className="text-xs font-semibold tracking-wide uppercase">Match</span>
                </div>
                <div className={`flex-1 rounded-lg overflow-hidden relative bg-[#111] aspect-video border border-white/10 ${alert.hoverBorder} transition-colors`}>
                  <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] uppercase font-bold text-white">Infraction</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-2 border-t border-white/5 pt-4">
                <button className={`bg-transparent text-white border border-white/10 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${alert.hoverBorder.replace('border', 'text').split('/')[0]} ${alert.hoverBorder} hover:bg-white/5 text-sm font-semibold`}>Ignore</button>
                <button className="bg-gradient-to-br from-purple-500 to-[#5E17EB] text-white font-bold px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 inline-flex items-center justify-center gap-2 hover:-translate-y-0.5 border-none shadow-[0_4px_15px_rgba(168,85,247,0.3)] text-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                  AI Report
                </button>
              </div>
            </div>
          ))
        )} */}

      </div>

      {footprints.map((item) => (
        <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 cursor-default">
          <div className={`w-12 h-12 rounded-md bg-cover bg-center border border-white/10 bg-gradient-to-br ${item.gradient} shadow-sm`}></div>
          <div className="flex-1 flex flex-col gap-1">
            <div className="text-sm font-semibold text-white tracking-wide truncate max-w-[200px]">{item.name}</div>
            <div className="text-xs text-slate-400 flex gap-2 font-medium">{item.meta}</div>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" title="Active Monitoring"></div>
        </div>
      ))}


    </div>
  );
}
