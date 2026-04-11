import { useState } from "react";
import JoinSession from "../components/session/JoinSession";
import { submitDoubt } from "../services/api";

function StudentSession() {
  const [joined, setJoined] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    if (!description.trim()) return;

    try {
      setLoading(true);
      setSuccessMessage(""); // Clear old message
      
      await submitDoubt(description, sessionId);
      setSuccessMessage("Doubt submitted successfully! 🚀");
      setDescription(""); // Clears the text box

    
    } catch (err) {
      console.error(err);
      alert("Error submitting doubt ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center text-white">

      {!joined ? (
        <JoinSession
          onJoin={(code) => {
            setSessionId(code);
            setJoined(true);
          }}
        />
      ) : (
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl w-[400px]">

          <h2 className="text-xl font-semibold mb-4">
            Joined Session: {sessionId}
          </h2>

          <textarea
            placeholder="Describe your doubt..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-3 px-3 py-2 rounded bg-white/20"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-white text-black py-2 rounded-lg"
          >
            {loading ? "Submitting..." : "Submit Doubt"}
          </button>
          {successMessage && (
  <p className="text-green-400 mt-2 text-center font-medium">
    {successMessage}
  </p>
)}

        </div>
      )}
    </div>
  );
}

export default StudentSession;