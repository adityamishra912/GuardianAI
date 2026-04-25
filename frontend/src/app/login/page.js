"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [loginMode, setLoginMode] = useState("guardian");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading] = useState(false);
  const [error] = useState(null);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const res = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password, mode: loginMode }),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       setError(data.message || "Invalid credentials. Please try again.");
  //       return;
  //     }

  //     // Store token if your backend returns one
  //     if (data.token) {
  //       localStorage.setItem("token", data.token);
  //     }

  //     if (loginMode === "guardian") {
  //       router.push("/");
  //     } else {
  //       router.push("/simulator");
  //     }
  //   } catch (err) {
  //     setError("Unable to connect to server. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // REGISTER USER
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);
      const user = userCredential.user;

      // STORE DETAILS IN FIRESTORE
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          email: user.email,
          name: name,
          role: loginMode
        },
        { merge: true }
      );

      // MODE
      if (loginMode === "guardian") {
        router.push("/");
      } else {
        router.push("/simulator");
      }

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        try {
          // LOGIN
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log("User logged in:", userCredential.user);
          // const user = userCredential.user;

          // // STORE DATA IN FIRESTORE
          // await setDoc(
          //   doc(db, "users", user.uid),
          //   {
          //     uid: user.uid,
          //     name: name,
          //     email: user.email,
          //     role: loginMode
          //   },
          //   { merge: true }
          // );

          // MODE
          if (loginMode === "guardian") {
            router.push("/");
          } else {
            router.push("/simulator");
          }

        } catch (loginError) {
          console.error("Login failed:", loginError.message);
        }
      } else {
        console.error("Signup error:", error.message);
      }
    }

  }

  return (
    <div className="flex min-h-screen items-center justify-center relative p-4">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="bg-[#0f172a]/60 backdrop-blur-[12px] border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] w-full max-w-md p-8 relative z-10 flex flex-col gap-6">

        <div className="flex flex-col items-center gap-2">
          {loginMode === "guardian" ? (
            <div className="text-3xl font-bold text-white flex items-center gap-2 tracking-tight">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Guardian<span className="text-cyan-400">-AI</span>
            </div>
          ) : (
            <div className="text-3xl font-bold text-white flex items-center gap-2 tracking-tight">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Social <span className="text-purple-500">Simulator</span>
            </div>
          )}
          <p className="text-slate-400 text-sm text-center mt-2">
            {loginMode === "guardian"
              ? "Sign in to protect and monitor your digital assets."
              : "Login to the social media simulation environment for demo purposes."}
          </p>
        </div>

        {/* Dual Toggle */}
        <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
          <button
            type="button"
            onClick={() => setLoginMode("guardian")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-300 ${loginMode === "guardian" ? "bg-cyan-400/20 text-cyan-400 shadow-sm" : "text-slate-400 hover:text-white"}`}
          >
            Admin Dashboard
          </button>
          <button
            type="button"
            onClick={() => setLoginMode("simulator")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-300 ${loginMode === "simulator" ? "bg-purple-500/20 text-purple-400 shadow-sm" : "text-slate-400 hover:text-white"}`}
          >
            Social Apps Sim
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Wick"
              className={`bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none transition-colors ${loginMode === 'guardian' ? 'focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400' : 'focus:border-purple-500 focus:ring-1 focus:ring-purple-500'}`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sportsnetwork.com"
              className={`bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none transition-colors ${loginMode === 'guardian' ? 'focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400' : 'focus:border-purple-500 focus:ring-1 focus:ring-purple-500'}`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-300">Password</label>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none transition-colors ${loginMode === 'guardian' ? 'focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400' : 'focus:border-purple-500 focus:ring-1 focus:ring-purple-500'}`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold px-6 py-3 rounded-lg mt-2 cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 border-none 
              ${loginMode === 'guardian'
                ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-black hover:shadow-[0_4px_15px_rgba(34,211,238,0.3)]'
                : 'bg-gradient-to-br from-purple-500 to-[#5E17EB] text-white hover:shadow-[0_4px_15px_rgba(168,85,247,0.3)]'
              } 
              hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : "Authenticate"}
          </button>
        </form>

      </div>
    </div>
  );
}
