import Link from "next/link";

const DetectCard = ({ item }) => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-lg hover:scale-[1.02] transition-all shadow-md">

            <div className="flex gap-2 mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>

                <p className="text-sm font-bold text-rose-400">Found match on Chirp!</p>
            </div>

            {/* User Info */}
            <div className="flex items-center justify-between mb-3">
                <div>
                    <p className="text-white font-semibold">
                        {item.user || "Unknown"}
                    </p>
                    <p className="text-xs text-slate-400">
                        {item.email}
                    </p>
                </div>

                {/* Similarity */}
                <div className="text-sm font-bold text-rose-400">
                    {(item.similarity * 100).toFixed(1)}%
                </div>
            </div>

            {/* Image */}
            <img
                src={item.imageUrl}
                alt="detected"
                className="w-full h-48 object-cover rounded-lg border border-white/10"
            />

            {/* BUTTON */}
            <Link href={`/simulator/${item.postId}`}>
                <div className="mt-4 text-white border border-white/10 px-4 py-2 rounded-lg transition-all hover:bg-cyan-400/5 bg-gradient-to-br from-cyan-400 to-blue-500">VIEW POST</div>
            </Link>

            <div className="mt-4">

                {(item.report).length > 0 && (
                    <p>REPORT : {item.report}</p>
                ) }
                
            </div>

        </div>
    );
};

export default DetectCard;