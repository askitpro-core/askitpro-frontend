function TeacherDoubtCard({ doubt, onSolve, onUpvote }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md 
                    hover:shadow-2xl hover:-translate-y-2 
                    transition-all duration-300 cursor-pointer">

      {/* TOP */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 h-20"></div>

      {/* CONTENT */}
      <div className="p-4">

        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-800 text-sm">
            {doubt.title}
          </h2>

          <span className={`text-xs px-2 py-1 rounded-full
            ${doubt.resolved ? "bg-green-500 text-white" : "bg-yellow-400 text-black"}
          `}>
            {doubt.resolved ? "Solved" : "Pending"}
          </span>
        </div>

        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {doubt.description}
        </p>

        {/* 👍 UPVOTE */}
        <button
          onClick={() => onUpvote(doubt.id)}
          className="mt-3 text-xs text-blue-600 hover:underline"
        >
          👍 {doubt.upvotes ?? 0}
        </button>

        {/* ✅ SOLVE */}
        <button
          onClick={() => onSolve(doubt.id)}
          disabled={doubt.resolved}
          className={`mt-3 w-full py-1 text-xs rounded-full transition
            ${doubt.resolved
              ? "bg-green-500 text-white cursor-not-allowed"
              : "border border-gray-300 hover:bg-gray-100"
            }
          `}
        >
          {doubt.resolved ? "Solved" : "Solve"}
        </button>

      </div>
    </div>
  );
}

export default TeacherDoubtCard;