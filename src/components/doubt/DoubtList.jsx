import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function DoubtList({ doubts }) {
  const [votes, setVotes] = useState({});

  const handleUpvote = (index) => {
  setVotes((prev) => {
    if (prev[index]) return prev; // already voted ❌

    return {
      ...prev,
      [index]: 1,
    };
  });
};

  if (!Array.isArray(doubts)) {
    return <p className="text-red-400 mt-6">Error loading doubts</p>;
  }

  if (doubts.length === 0) {
    return (
      <p className="text-gray-300 text-center mt-6">
        No doubts yet. Be the first one 🚀
      </p>
    );
  }

  return (
    <div className="mt-12 w-full max-w-2xl space-y-5">
      {doubts.map((doubt, index) => (
        <div
          key={index}
          className="group relative p-6 rounded-2xl 
                     bg-white/10 backdrop-blur-xl 
                     border border-white/20 
                     shadow-lg hover:shadow-2xl 
                     hover:scale-[1.02]
                     transition duration-300 
                     animate-fadeIn flex justify-between gap-4"
        >
          {/* LEFT CONTENT */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition">
              {doubt.title}
            </h2>

            <p className="text-gray-300 text-sm mb-3 leading-relaxed">
              {doubt.description}
            </p>

            <span className="text-xs text-gray-400">
              {doubt.timestamp
                ? new Date(doubt.timestamp).toLocaleString()
                : ""}
            </span>
          </div>

          {/* RIGHT SIDE - UPVOTE */}
          <div className="flex flex-col items-center justify-center gap-2">
            <button
              onClick={() => handleUpvote(index)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              <FaArrowUp className="text-white" />
            </button>

            <span className="text-white text-sm font-semibold">
              {votes[index] || 0}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoubtList;