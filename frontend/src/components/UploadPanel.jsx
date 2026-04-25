"use client";

import { useState } from "react";

export default function UploadPanel({ recentUploads = [] }) {
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    setLoading(true);

    // ==========================================
    // TO-DO: UPLOAD TO YOUR BACKEND API HERE
    // Send file to Node JS processing pipeline
    // ==========================================

    // SIMULATE AI PROCESSING DELAY
    setTimeout(() => {
      setLoading(false);

      // Dispatch Real-time Event to alert system



    }, 3000);
  };

  return (
    <div className="bg-[#0f172a]/60 backdrop-blur-[12px] border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex flex-col gap-6 p-6 h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          Protect Official Media
        </h2>
      </div>

      <div onClick={(e) => {
        if (!loading) document.getElementById('file-upload').click();
      }} className={`flex-1 border-2 border-dashed border-cyan-400/30 rounded-xl flex flex-col items-center justify-center gap-4 bg-black/20 hover:bg-cyan-400/5 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-300 cursor-pointer min-h-[200px] ${loading ? 'opacity-50 cursor-wait' : ''}`}>

        <div className={`w-16 h-16 rounded-full bg-cyan-400/10 text-cyan-400 flex items-center justify-center ${loading ? 'animate-spin' : 'animate-pulseGlow'}`}>
          {loading ? (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          )}
        </div>

        <div className="text-center">
          <h3 className="text-base font-semibold mb-1 text-white">{loading ? 'AI Hashing...' : 'Drag & Drop Assets'}</h3>
          <p className="text-sm text-slate-400">{loading ? 'Generating digital fingerprint' : 'Support for JPG, PNG, GIF (Max 20MB)'}</p>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
        />

        {!loading && (
          <button onClick={handleUpload} className="bg-gradient-to-br from-cyan-400 to-blue-500 text-black font-bold px-6 py-2.5 rounded-lg cursor-pointer transition-all duration-300 inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(34,211,238,0.3)] mt-2">
            Select Files
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm text-slate-400 font-medium uppercase tracking-wide">Recently Fingerprinted</h3>

        {recentUploads.map((item) => (
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
    </div>
  );
}
