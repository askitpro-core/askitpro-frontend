import { useState, useEffect } from "react";
import SessionHeader from "../components/session/SessionHeader";

function TeacherSession() {
  const [sessionId, setSessionId] = useState(null);
  const [doubts, setDoubts] = useState([]);

  // 🔥 Polling
  useEffect(() => {
    if (!sessionId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/doubts");
        const data = await res.json();
        setDoubts(data.doubts || data);
      } catch (err) {
        console.error(err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [sessionId]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-30 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-30 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* 🔥 Main Container */}
      <div className="max-w-6xl mx-auto p-6">

        {/* 🔥 Title */}
        <h1 className="text-4xl font-bold text-center mb-10 tracking-wide">
          Live Classroom Session 🚀
        </h1>

        {/* 🔥 MAIN LOGIC (THIS IS WHERE YOUR CODE GOES) */}
        {!sessionId ? (
          <div className="flex justify-center">
            <button
              onClick={() => setSessionId("ABC123")}
              className="bg-white text-black px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
            >
              🚀 Start Session
            </button>
          </div>
        ) : (
          <div>

            {/* 🔥 Header from teammate */}
            <SessionHeader sessionId={sessionId} />

            {/* 🔥 Doubts */}
            <div className="mt-8 grid gap-4">
              {doubts.length === 0 ? (
                <p className="text-gray-300 text-center">
                  No doubts yet...
                </p>
              ) : (
                doubts.map((doubt) => (
                  <div
                    key={doubt.id}
                    className="bg-white/10 backdrop-blur-xl p-5 rounded-2xl shadow-lg hover:scale-[1.02] transition"
                  >
                    <h2 className="font-semibold text-lg">
                      {doubt.title}
                    </h2>

                    <p className="text-sm text-gray-300 mt-1">
                      {doubt.description}
                    </p>

                    <div className="flex justify-between mt-3 text-xs text-gray-400">
                      <span>👍 {doubt.upvotes || 0}</span>
                      <span>Live</span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherSession;