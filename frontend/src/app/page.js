"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TopStats from "../components/TopStats";
import AlertsFeed from "../components/AlertsFeed";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Home() {
  // const [data, setData] = useState({
  //   recentUploads: [
  //     { id: 1, name: "Premier_League_Match_Still.jpg", meta: "4.2 MB • pHash generated", gradient: "from-rose-500 to-purple-500" },
  //     { id: 2, name: "Lakers_Dunk_Shot1.png", meta: "2.4 MB • pHash generated", gradient: "from-cyan-400 to-blue-500" }
  //   ],
  //   alerts: [] // Starting empty to showcase the new Empty State UI
  // });

  // const [loading, setLoading] = useState(false);
  // const [uploadLoading, setUploadLoading] = useState(false);
  // const [file, setFile] = useState(null);
  // const [preview, setPreview] = useState(null);
  // const [lastUpdated, setLastUpdated] = useState("");
  // const [recentUploads, setRecentUploads] = useState([]);
  // const inputRef = useRef(null);
  // const [players, setPlayers] = useState([]);
  const [footprints, setFootprints] = useState([]);
  // const [refresh, setRefresh] = useState(0);
  const [email, setEmail] = useState(null);
  const [assets, setAssets] = useState(2);


  // Dynamic Threat Logic
  // const totalAlerts = data.alerts.length;
  let threatLevel = "LOW";
  let threatColor = "text-emerald-400";
  let threatBg = "bg-emerald-400/10 border-emerald-400";

  // if (totalAlerts >= 5) {
  //   threatLevel = "HIGH";
  //   threatColor = "text-rose-500";
  //   threatBg = "bg-rose-500/10 border-rose-500";
  // } else if (totalAlerts >= 2) {
  //   threatLevel = "MEDIUM";
  //   threatColor = "text-yellow-400";
  //   threatBg = "bg-yellow-400/10 border-yellow-400";
  // }

  const generatedStats = {
    monitoredMedia: assets, // Base static count
    activeViolations: 0,
    confidenceScore: "92%",
    threatLevel,
    threatColor,
    threatBg
  };

  // FETCH
  useEffect(() => {
    const fetchFootprints = async () => {
      if (!email) return; // safety check

      const q = query(
        collection(db, "footprints"),
        where("email", "==", email)
      );

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setFootprints(data);
      setAssets(footprints.length+1);
    };

    fetchFootprints();
  }, [email]);

  // GET USER EMAIL
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      setEmail(user.email);
    });

    return () => unsub();
  }, []);



  // SUBMIT THE FILE
  // const handleUpload = (e) => {
  //   e.preventDefault();
  // }

  // TRIGGER SELECT INPUT
  // const handleInput = () => {
  //   inputRef.current.click(); // 🔥 trigger input
  // };

  // SET PREVIEW ON FILE CHANGE
  // useEffect(() => {
  //   if (!file) return;

  //   const objectUrl = URL.createObjectURL(file);
  //   setPreview(objectUrl);

  //   return () => URL.revokeObjectURL(objectUrl); // cleanup
  // }, [file]);


  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 flex flex-col gap-8">

        <header className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold m-0 flex items-center gap-3">
              Command Center
              <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-2 transition-colors duration-500 ${threatBg} ${threatColor}`}>
                <div className={`w-2 h-2 rounded-full bg-current ${threatLevel === 'HIGH' ? 'animate-ping' : ''}`}></div>
                THREAT LEVEL: {threatLevel}
              </span>
            </h1>
            <p className="text-slate-400 mt-1">Overview of your digital asset protection pipeline.</p>
          </div>
          <div className="flex gap-4 items-center flex-wrap">
            {/* <button className="bg-transparent text-white border border-white/10 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/5">Export All</button> */}
          </div>
        </header>

        <TopStats stats={generatedStats} />

        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[400px]">
          <div className="w-full lg:w-1/3 min-w-0">
            {/* Upload Panel */}
            <div className="bg-[#0f172a]/60 backdrop-blur-[12px] border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex flex-col gap-6 p-6 h-full">
              {/* Heading */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-cyan-400" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  Protect Official Media
                </h2>
              </div>

              {/* UPLOAD SECTION */}

              <Link href={'/media'}>
                <div className={`flex-1 border-2 border-dashed border-cyan-400/30 rounded-xl flex items-center justify-center gap-6 bg-black/20 hover:bg-cyan-400/5 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-300 cursor-pointer min-h-[200px]`}>
                  <div className="flex flex-col items-center justify-around h-[80%] relative">

                    <div className="h-16 w-16 border-3 border-white border-solid rounded-2xl flex justify-center items-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </div>

                    <button className="bg-gradient-to-br from-cyan-400 to-blue-500 text-black font-bold px-6 py-2.5 rounded-lg cursor-pointer transition-all duration-300 inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(34,211,238,0.3)] mt-2">
                      Select Files
                    </button>
                  </div>
                </div>
              </Link>

              {/* <div className="flex flex-col gap-3">
                <h3 className="text-sm text-slate-400 font-medium uppercase tracking-wide">Recently Fingerprinted</h3>

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
              </div> */}
            </div>

          </div>
          <div className="w-full lg:w-2/3 min-w-0 h-full max-h-[800px]">
            <AlertsFeed footprints={footprints}/>
          </div>
        </div>

      </main>
    </div>
  );
}
