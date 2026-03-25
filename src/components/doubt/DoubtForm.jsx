import { useState } from "react";
import { submitDoubt } from "../../services/api";

function DoubtForm({ onSubmitSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await submitDoubt(title, description);

      setMessage("✅ Doubt submitted successfully!");
      setTitle("");
      setDescription("");

      onSubmitSuccess && onSubmitSuccess();

    } catch {
      setMessage("❌ Error submitting doubt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl p-8 rounded-3xl 
                    bg-white/10 backdrop-blur-2xl 
                    border border-white/20 shadow-2xl">

      <h1 className="text-4xl font-bold text-white text-center mb-2">
        AskItPro 🚀
      </h1>

      <p className="text-center text-gray-300 mb-6 text-sm">
        Ask doubts anonymously. Learn without fear.
      </p>

      <input
        type="text"
        placeholder="e.g. What is recursion?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-3 mb-4 rounded-xl 
                   bg-white/20 text-white placeholder-gray-300
                   border border-white/20 focus:ring-2 focus:ring-indigo-400 outline-none"
      />

      <textarea
        placeholder="Explain your doubt clearly..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        className="w-full px-4 py-3 mb-6 rounded-xl 
                   bg-white/20 text-white placeholder-gray-300
                   border border-white/20 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-3 rounded-xl font-semibold transition
        ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-[1.02]"
        }`}
      >
        {loading ? "Submitting..." : "Submit Doubt"}
      </button>

      {message && (
        <p className="text-center mt-4 text-sm text-gray-200">
          {message}
        </p>
      )}
    </div>
  );
}

export default DoubtForm; 