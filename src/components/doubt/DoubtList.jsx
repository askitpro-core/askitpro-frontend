import { FaArrowUp } from "react-icons/fa";

function DoubtList({ doubts, setDoubts }) {
  const handleUpvote = async (id) => {
    if (id === undefined || id === null) {
      console.error("No ID found for this doubt!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/doubts/${id}/upvote`,
        {
          method: "POST",
        },
      );

      const result = await response.json();

      if (result.message === "Already voted") return;

      // Update the UI state locally
      if (result.data && typeof result.data.upvotes === "number") {
        const updated = doubts.map((d) =>
          d.id === id ? { ...d, upvotes: result.data.upvotes } : d,
        );
        setDoubts(updated);
      }
    } catch (error) {
      console.error("Upvote failed:", error);
    }
  };

  if (!Array.isArray(doubts) || doubts.length === 0) {
    return null; // Don't show anything if empty
  }

  return (
    // mt-12 creates the gap between the main box and the first doubt
    <div className="mt-12 w-full max-w-2xl space-y-5">
      {doubts.map((doubt) => (
        <div
          key={doubt.id}
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
          </div>

          {/* RIGHT SIDE - UPVOTE */}
          <div className="flex flex-col items-center justify-center gap-2">
            <button
              onClick={() => handleUpvote(doubt.id)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              <FaArrowUp className="text-white text-sm" />
            </button>

            <span className="text-white text-sm font-semibold">
              {doubt.upvotes || 0}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoubtList;
