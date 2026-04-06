import { useState } from "react";

const JoinSession = ({ onJoin }) => {
  const [sessionCode, setSessionCode] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#140f2d] via-[#24114f] to-[#120d24]">

      <div className="w-full max-w-lg rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md p-8 shadow-2xl">

        <h2 className="text-white text-2xl font-semibold text-center mb-6">
          Join Session
        </h2>

        <input
          type="text"
          placeholder="Enter session code"
          value={sessionCode}
          onChange={(e) => setSessionCode(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/20 text-white mb-4"
        />

        <button
          onClick={() => onJoin(sessionCode)}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white"
        >
          Join
        </button>

      </div>
    </div>
  );
};

export default JoinSession;