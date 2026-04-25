'use client';
import Sidebar from "../../../components/Sidebar";
import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useParams } from 'next/navigation';
import DetectCard from '../../../components/DetectCard';

export default function Page() {
    const params = useParams();
    const id = params?.id;
    console.log(id);
    const [detects, setDetects] = useState([]);
    const [loading, setLoading] = useState(false);

    const scan = async () => {
        if (!id) return;
        setLoading(true);

        try {
            const posts = await getLast6Posts();

            const res = await fetch("https://guardianaibackennd4-production.up.railway.app/detect", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    footprint_id: id,
                    posts: posts
                })
            });

            const data = await res.json();
            console.log("Detection result:", data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!id) return;

        const docRef = doc(db, "footprints", id);

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();

                setDetects(data.detects || []);
            } else {
                setDetects([]);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, [id]);

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 flex flex-col gap-8 relative">
                <header className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold m-0 flex items-center gap-3">
                            Analytics & Reports
                        </h1>
                        <p className="text-slate-400 mt-1">Generate automated legal reports and system performance analytics.</p>
                    </div>
                    <button
                        onClick={scan}
                        className="text-white border border-white/10 px-4 py-2 rounded-lg transition-all hover:bg-cyan-400/5 bg-gradient-to-br from-cyan-400 to-blue-500">
                        Scan
                    </button>
                </header>

                {(loading) ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">

                        {/* Spinner */}
                        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>

                        {/* Text */}
                        <p className="text-slate-400 text-sm">
                            Scanning posts and analyzing similarity...
                        </p>

                    </div>
                ) : (
                    <div className="flex-1 bg-[#0f172a]/60 backdrop-blur-[12px] border border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] relative w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {detects.length === 0 ? (
                                <div className="h-full w-full flex justify-center items-center">
                                    <p className="text-slate-400">No violations detected</p>
                                </div>
                            ) : (
                                detects.map((item, i) => (
                                    <DetectCard key={i} item={item} />
                                ))
                            )}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

const getLast6Posts = async () => {
    const q = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        limit(6)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        imageUrl: doc.data().imageUrl,
        email: doc.data().email,
        user: doc.data().user,
    }));
};