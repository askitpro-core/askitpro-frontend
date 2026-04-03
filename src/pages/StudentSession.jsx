import { useState } from "react";
import JoinSession from "../components/session/JoinSession";

function StudentSession() {
  const [joined, setJoined] = useState(false);
  const [sessionId, setSessionId] = useState("");

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

          <input
            placeholder="Doubt title"
            className="w-full mb-3 px-3 py-2 rounded bg-white/20"
          />

          <textarea
            placeholder="Describe your doubt..."
            className="w-full mb-3 px-3 py-2 rounded bg-white/20"
          />

          <button className="w-full bg-white text-black py-2 rounded-lg">
            Submit Doubt
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentSession;