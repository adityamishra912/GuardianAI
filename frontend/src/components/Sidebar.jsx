"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [name, setName] = useState('User');
  const [email, setEmail] = useState('user@gmail.com');
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      setEmail(user.email);

      const docRef = doc(db, "users", user.uid);
      const snap = await getDoc(docRef);
      const userData = snap.exists() ? snap.data() : {};

      setName(userData.name);
    });

    return () => unsub();
  }, []);

  const getNavClass = (path) => {
    const isActive = pathname === path;
    if (isActive) {
      return "px-4 py-3.5 text-cyan-400 font-medium transition-all duration-300 cursor-pointer flex items-center gap-3 bg-gradient-to-r from-cyan-400/10 to-transparent border-l-4 border-cyan-400 rounded-r-lg";
    }
    return "px-4 py-3.5 rounded-lg text-slate-400 font-medium transition-all duration-300 cursor-pointer flex items-center gap-3 hover:bg-white/5 hover:text-white";
  };

  const logOutClass = (path) => {
    const isActive = pathname === path;
    if (isActive) {
      return "px-4 py-3.5 text-cyan-400 font-medium transition-all duration-300 cursor-pointer flex items-center gap-3 bg-gradient-to-r from-cyan-400/10 to-transparent border-l-4 border-cyan-400 rounded-r-lg";
    }
    return "px-4 py-3.5 rounded-lg text-white-400 font-medium transition-all duration-300 cursor-pointer flex items-center gap-3 bg-red-500 hover:bg-red-600 hover:text-white";
  };

  const simulatorClass = (path) => {
    const isActive = pathname === path;
    if (isActive) {
      return "px-4 py-3.5 text-cyan-400 font-medium transition-all duration-300 cursor-pointer flex items-center gap-3 bg-gradient-to-r from-cyan-400/10 to-transparent border-l-4 border-cyan-400 rounded-r-lg";
    }
    return "px-4 py-3.5 rounded-lg text-white-400 font-medium transition-all duration-300 cursor-pointer flex items-center gap-3 bg-cyan-500 hover:bg-cyan-600 hover:text-white";
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth");

  }

  return (
    <aside className="w-[260px] shrink-0 h-screen sticky top-0 left-0 py-8 px-6 flex flex-col gap-8 border-r border-white/10 bg-[#070a14]/80 backdrop-blur-md z-50">
      <div className="text-2xl font-bold text-white flex items-center gap-2 tracking-tight">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        Guardian<span className="text-cyan-400">AI</span>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        <Link href="/" className={getNavClass("/")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          Dashboard
        </Link>
        <Link href="/media" className={getNavClass("/media")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          Media Assets
        </Link>
        <Link href="/alerts" className={getNavClass("/alerts")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          Alerts
        </Link>
        <Link href="/reports" className={getNavClass("/reports")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          Reports
        </Link>

        {/* Profile */}
        <div
          className={getNavClass("/profilr")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21a8 8 0 1 0-16 0"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <div className="flex flex-col">
            <p>{name}</p>
            <p className="text-[12px]">{email}</p>
          </div>
        </div>

        {/* Logout */}
        <div className={logOutClass("/logout")} onClick={handleLogout}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </div>

        {/* Simulator */}
        <Link href='/simulator'>
          <div className={simulatorClass("/simulator")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            Simulator
          </div>
        </Link>
      </nav>
    </aside>
  );
}
