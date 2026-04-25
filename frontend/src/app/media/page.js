'use client';
import Sidebar from "../../components/Sidebar";
import { useState, useEffect, useRef } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function MediaPage() {
  const [state, setState] = useState('media');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);
  // const playerRef = useRef();
  // const [players, setPlayers] = useState([]);
  const [footprints, setFootprints] = useState([]);
  const [name, setName] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [email, setEmail] = useState(null);

  // TRIGGER SELECT INPUT
  const handleInput = () => {
    inputRef.current.click(); // 🔥 trigger input
  };

  // SET PREVIEW ON FILE CHANGE
  useEffect(() => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl); // cleanup
  }, [file]);

  // GET USER EMAIL
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      setEmail(user.email);
    });

    return () => unsub();
  }, []);

  // SELECT PLAYER IMAGE
  // const handleFileChange = () => { }

  // SUBMIT TO MAKE DIGITAL FOOTPRINT
  const handleSubmit = async () => {
    if (!file || !name || !email) return;
    setState('loading');

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("email", email);

    try {
      const res = await fetch("https://guardianaibackennd4-production.up.railway.app/create-embedding", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      setState('media'); // success screen
    } catch (err) {
      console.error(err);
      setState('upload');
    } finally {
      setRefresh(prev => prev + 1); // 🔥 forces re-run
    }

  }

  // FETCH ASSETS FROM FIRESTORE
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
    };

    fetchFootprints();
  }, [refresh, email]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 flex flex-col gap-8">
        <header className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold m-0 flex items-center gap-3">
              Media Asset Library
            </h1>
            <p className="text-slate-400 mt-1">Manage and review your hashed official digital assets.</p>
          </div>
          <button
            className="bg-gradient-to-br from-cyan-400 to-blue-500 text-black font-bold px-6 py-2 rounded-lg cursor-pointer transition-all hover:shadow-[0_4px_15px_rgba(34,211,238,0.3)]"
            type="button"
            onClick={() => setState('upload')}
          >
            Upload New Asset
          </button>
        </header>

        {/* MAIN BODY */}

        {(state == 'upload') ? (
          <div className="flex-1 bg-[#0f172a]/60 backdrop-blur-[12px] border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">

            {/* NAME INPUT */}
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder="Name of Event...." className="w-[80%] h-20 border-blue-500 border-2 px-6 rounded-2xl" />

            {/* UPLOAD BODY */}
            <div className="flex items-center justify-center text-center gap-4 h-full w-full">

              {/* UPLOAD IMAGE ASSET */}
              <div className="flex flex-col items-center justify-around h-[80%] w-[40%] relative">

                {preview ? (
                  <div className="object-cover h-[80%] w-[w-80%]">
                    <img
                      src={preview}
                      alt="Preview"
                      style={{ marginTop: "20px" }}
                    />
                  </div>
                ) : (
                  <div className="h-[80%] w-[80%] border-3 border-white border-solid rounded-2xl flex justify-center items-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  </div>
                )}

                {/* Hidden file input */}
                <input
                  ref={inputRef}
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />

                {!preview && (
                  <button onClick={handleInput} className="bg-gradient-to-br from-cyan-400 to-blue-500 font-bold w-[80%] py-4 text-white text-center rounded-lg cursor-pointer transition-all duration-300 items-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(34,211,238,0.3)] mt-2">
                    Select Files
                  </button>
                )}
              </div>

              {/* ADD PLAYERS */}
              {/* {preview && (
                <div className="flex flex-col justify-around items-center w-[60%]">

                  <div className="h-40 w-full relative">
                    <div className="h-10 w-10 bg-gradient-to-br from-cyan-400 to-blue-500 text-white flex justify-center items-center absolute top-[40%]">&#60;</div>
                    <div className="h-10 w-10 bg-gradient-to-br from-cyan-400 to-blue-500 text-white flex justify-center items-center absolute top-[40%] right-0">&#62;</div>
                  </div>

                  {/* ADD PLAYER BTN */}
              {/* Hidden input */}
              {/* <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={playerRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  /> */}
              {/* <div

                    className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white font-bold px-6 py-2.5 rounded-lg cursor-pointer transition-all duration-300 inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(34,211,238,0.3)] mt-2">Add Player</div>
                </div> */}
              {/* )} */}

            </div>

            {/* SUBMIT BUTTON */}
            {preview && (
              <button onClick={handleSubmit} className="mt-16 bg-gradient-to-br from-cyan-400 to-blue-500 font-bold w-[80%] py-4 text-white text-center rounded-lg cursor-pointer transition-all duration-300 items-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(34,211,238,0.3)]">
                Submit
              </button>
            )}

          </div>
        ) : (state == 'loading') ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex-1 bg-[#0f172a]/60 backdrop-blur-[12px] border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center gap-2 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            {footprints.map((item) => (
              <Link key={item.id} className="w-[80%] h-20 bg-blue-500 flex justify-center items-center rounded-2xl" href={`/media/${item.id}`}>
                {item.name}
              </Link>
            ))}
          </div>
        )
        }

      </main >
    </div >
  );
}
