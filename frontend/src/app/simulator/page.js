"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { addDoc } from "firebase/firestore";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

const platforms = {

  chirp: {
    name: "Chirp",
    themePrimary: "bg-blue-500",
    themeText: "text-blue-500",
    themeRing: "focus:ring-blue-500",
    themeHover: "hover:bg-blue-600",
    themeLight: "bg-blue-50",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
  },
  nexus: {
    name: "Nexus",
    themePrimary: "bg-indigo-600",
    themeText: "text-indigo-600",
    themeRing: "focus:ring-indigo-600",
    themeHover: "hover:bg-indigo-700",
    themeLight: "bg-indigo-50",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
  },
  prism: {
    name: "Prism",
    themePrimary: "bg-pink-500",
    themeText: "text-pink-500",
    themeRing: "focus:ring-pink-500",
    themeHover: "hover:bg-pink-600",
    themeLight: "bg-pink-50",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  }
};

export default function SocialSimulator() {
  const router = useRouter();
  const [activePlatform] = useState("chirp");
  const [feed, setFeed] = useState([]);
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('User');
  const [email, setEmail] = useState('user@gmail.com');

  const current = platforms[activePlatform];

  // CURRENT USER DATA
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

  // FEED
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeed(postsData);
    });

    return () => unsubscribe();
  }, []);

  // UPLOAD IMAGE
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url; // 🔥 important
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!postText && !selectedImage) return;

    setLoading(true);

    let imageUrl = null;

    if (selectedImage) {
      imageUrl = await uploadToCloudinary(selectedImage);
    }
    // Save to Firestore
    await addDoc(collection(db, "posts"), {
      text: postText,
      imageUrl: imageUrl || null, // already URL from IKUpload
      createdAt: new Date(),
      user: name,
      email: email,
    });

    setLoading(false);
    setPostText("");
    setSelectedImage(null);

  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 transition-colors duration-500 flex flex-col font-sans">

      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">

          <div className={`flex items-center gap-2 font-bold text-xl ${current.themeText} transition-colors`}>
            {current.icon}
            {current.name} Web
          </div>

          <button type="button" className="text-sm font-bold text-slate-500 hover:text-rose-500 transition-colors uppercase tracking-wide" onClick={() => router.push("/")}>
            Exit Sim
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 relative">

        {/* Left Column - User Profile & Upload */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
            <div className={`h-28 ${current.themePrimary} transition-colors`}></div>
            <div className="px-6 pb-6 relative">
              <div className="w-20 h-20 rounded-full bg-slate-100 border-4 border-white -mt-10 mx-auto shadow-sm overflow-hidden flex items-center justify-center relative z-10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <div className="text-center mt-3">
                <h2 className="font-bold text-xl text-slate-800">{name}</h2>
                <p className="text-slate-500 text-sm font-medium">{email}</p>
              </div>
              <div className="mt-4 flex justify-around text-center border-t border-slate-100 pt-4">
                <div><div className={`font-bold ${current.themeText}`}>124</div><div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Posts</div></div>
                <div><div className={`font-bold ${current.themeText}`}>8.2k</div><div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Followers</div></div>
              </div>
            </div>
          </div>

          {/* Create Post Interface */}
          <form className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4" onSubmit={handleUploadSubmit}>
            <div className="flex items-center gap-3 mb-1">
              <div className={`w-8 h-8 rounded-full ${current.themeLight} flex items-center justify-center ${current.themeText}`}>
                {current.icon}
              </div>
              <h3 className="font-bold text-slate-800 text-lg">Create Post</h3>
            </div>

            <textarea
              placeholder={`What's happening on ${current.name}?`}
              value={postText}
              onChange={e => setPostText(e.target.value)}
              className={`w-full bg-slate-50/50 border border-slate-200 rounded-xl p-4 text-base focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none ${current.themeRing}`}
              rows={3}
            ></textarea>

            <div onClick={() => document.getElementById('post-image').click()} className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${selectedImage ? `border-emerald-400 bg-emerald-50 text-emerald-600` : `border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-500`}`}>
              {selectedImage ? (
                <>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span className="text-sm font-bold">Image Attached</span>
                </>
              ) : (
                <>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  <span className="text-sm font-bold">Attach Image</span>
                </>
              )}
              <input type="file" id="post-image" className="hidden" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} />
            </div>

            <button
              type="submit"
              disabled={loading || (!postText && !selectedImage)}
              className={`w-full text-white font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center shadow-md ${current.themePrimary} ${current.themeHover} disabled:opacity-50 disabled:shadow-none hover:-translate-y-0.5`}
            >
              {loading ? "Publishing..." : "Simulate Public Post"}
            </button>
          </form>

        </div>

        {/* Right Column - Feed */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h2 className="font-bold text-xl flex items-center gap-2 text-slate-800">
              Timeline
            </h2>
            <div className={`text-xs font-bold px-3 py-1 rounded-full ${current.themeLight} ${current.themeText}`}>
              {current.name} Engine
            </div>
          </div>

          {/* POST FEED */}

          <div className="flex flex-col gap-5">
            {feed.length === 0 ? (
              <div className="text-center text-slate-500">No posts yet</div>
            ) : (
              feed.map((post) => (
                <Link
                  href={`/simulator/${post.id}`}
                  key={post.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex gap-4 hover:shadow-md transition"
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="7" r="4" />
                      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* User info */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">
                        {post.user || "User"}
                      </span>
                      <span className="text-sm text-slate-500">
                        {post.email}
                      </span>
                    </div>

                    {/* Text */}
                    {post.text && (
                      <p className="text-slate-800 mt-1 whitespace-pre-wrap">
                        {post.text}
                      </p>
                    )}

                    {/* Image */}
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt="post"
                        className="mt-3 rounded-xl border border-slate-200 max-h-96 object-cover w-full"
                      />
                    )}

                    {/* Actions */}
                    <div className="flex justify-between mt-4 max-w-md text-slate-500">
                      <button className="flex items-center gap-2 hover:text-blue-500">
                        💬 <span className="text-sm">Comment</span>
                      </button>

                      <button className="flex items-center gap-2 hover:text-emerald-500">
                        🔁 <span className="text-sm">Share</span>
                      </button>

                      <button className="flex items-center gap-2 hover:text-rose-500">
                        ❤️ <span className="text-sm">Like</span>
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

        </div>

      </main>
    </div>
  );
}
