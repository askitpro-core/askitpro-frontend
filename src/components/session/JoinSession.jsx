import { useState } from "react";

const JoinSession = () => {
  const [sessionCode, setSessionCode] = useState("");
  const [error, setError] = useState("");

  const handleJoin = () => {
    const trimmedCode = sessionCode.trim();

    if (!trimmedCode) {
      setError("Please enter a session code");
      return;
    }

    setError("");
    console.log("Joining session with code:", trimmedCode);
  };

  return (
  <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#140f2d] via-[#24114f] to-[#120d24]">
    <div className="w-full max-w-lg rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md p-8 shadow-2xl">
      <h2 className="text-white text-2xl font-semibold text-center mb-6">
        Join Session
      </h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter session code"
          value={sessionCode}
          onChange={(e) => {
            setSessionCode(e.target.value);
            if (error) setError("");
          }}
          className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        {error && <p className="text-red-300 text-sm">{error}</p>}

        <button
          onClick={handleJoin}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-medium transition"
        >
          Join
        </button>
      </div>
    </div>
  </div>
);
};

export default JoinSession;