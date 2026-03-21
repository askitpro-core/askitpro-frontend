import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setToast("⚠️ Fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8000/submit-doubt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) throw new Error();

      setToast("✅ Doubt submitted successfully!");
      setTitle("");
      setDescription("");

      setTimeout(() => setToast(""), 3000);
    } catch {
      setToast("❌ Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">

      {/* Glow */}
      <div className="absolute w-[500px] h-[500px] bg-pink-500 opacity-20 blur-3xl rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-500 opacity-20 blur-3xl rounded-full bottom-[-150px] right-[-150px]" />

      {/* Card */}
      <div className="relative w-full max-w-lg p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-all hover:scale-[1.01]">

        {/* Header */}
        <h1 className="text-4xl font-bold text-white text-center mb-1">
          AskItPro 🚀
        </h1>
        <p className="text-center text-white/80 mb-6 text-sm">
          Ask doubts anonymously. Learn without fear.
        </p>

        {/* Title */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="e.g. What is recursion?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 
                       border border-white/30 focus:outline-none focus:ring-2 focus:ring-white transition"
          />
          <p className="text-xs text-white/60 mt-1 text-right">
            {title.length}/100
          </p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <textarea
            placeholder="Explain your doubt clearly..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 
                       border border-white/30 focus:outline-none focus:ring-2 focus:ring-white resize-none transition"
          />
          <p className="text-xs text-white/60 mt-1 text-right">
            {description.length}/300
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-white text-purple-600 hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
          }`}
        >
          {loading ? "Submitting..." : "Submit Doubt"}
        </button>

      </div>

      {/* Toast */}
      {toast && (
        <div className="absolute bottom-6 bg-white text-gray-800 px-6 py-3 rounded-xl shadow-lg animate-bounce">
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;