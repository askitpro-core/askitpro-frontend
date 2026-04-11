import { useState, useEffect } from "react";
import SessionHeader from "../components/session/SessionHeader";
import { getDoubts } from "../services/api";

function TeacherSession() {

  // ✅ Persist session
  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem("sessionId") || null;
  });

  const [doubts, setDoubts] = useState([]);

  // 🔥 INITIAL FETCH
  useEffect(() => {
    if (!sessionId) return;

    const fetchInitial = async () => {
      try {
        const data = await getDoubts(sessionId);
        console.log("INITIAL DOUBTS:", data);
        setDoubts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchInitial();
  }, [sessionId]);

  // 🔥 WEBSOCKET
  useEffect(() => {
    if (!sessionId) return;

    const ws = new WebSocket(`ws://localhost:8000/ws/${sessionId}`);

    ws.onopen = () => console.log("✅ WS connected");

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === "NEW_DOUBT") {
          const newDoubt = message.data;

          setDoubts((prev) => {
            const exists = prev.some((d) => d?.id === newDoubt.id);
            if (exists) return prev;

            return [newDoubt, ...prev];
          });
        }
      } catch (err) {
        console.error("WS parse error:", err);
      }
    };

    ws.onerror = (err) => console.error("WS error:", err);
    ws.onclose = () => console.log("❌ WS disconnected");

    return () => ws.close();
  }, [sessionId]);

  // 🔥 FINAL CLEAN VOTING SYSTEM
  const handleVote = async (id, type) => {
    try {
      const currentVote = localStorage.getItem("vote_" + id);

      // ✅ UPVOTE (ONLY ONCE)
      if (type === "up") {
        if (currentVote === "up") return;

        setDoubts((prev) =>
          prev.map((d) =>
            d.id === id
              ? { ...d, upvotes: (d.upvotes ?? 0) + 1 }
              : d
          )
        );

        localStorage.setItem("vote_" + id, "up");

        await fetch(`http://127.0.0.1:8000/doubts/${id}/upvote`, {
          method: "POST",
        });
      }

      // 🔁 DOWNVOTE = UNDO ONLY
      if (type === "down") {
        if (currentVote !== "up") return;

        setDoubts((prev) =>
          prev.map((d) =>
            d.id === id
              ? { ...d, upvotes: Math.max(0, (d.upvotes ?? 0) - 1) }
              : d
          )
        );

        localStorage.removeItem("vote_" + id);
      }

    } catch (err) {
      console.error("Vote error:", err);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">

      {/* Background */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-30 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-30 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-4xl font-bold text-center mb-10">
          Live Classroom Session 🚀
        </h1>

        {!sessionId ? (
          <div className="flex justify-center">
            <button
              onClick={() => {
                const id = "CS101";
                localStorage.setItem("sessionId", id);
                setSessionId(id);
              }}
              className="bg-white text-black px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
            >
              🚀 Start Session
            </button>
          </div>
        ) : (
          <>
            <SessionHeader sessionId={sessionId} />

            {/* END SESSION */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  localStorage.removeItem("sessionId");
                  setSessionId(null);
                  setDoubts([]);
                }}
                className="text-sm text-red-300 hover:text-red-400"
              >
                End Session
              </button>
            </div>

            {/* DOUBTS */}
            <div className="mt-8 grid gap-4">
              {doubts.length === 0 ? (
                <p className="text-center text-gray-300">
                  No doubts yet...
                </p>
              ) : (
                doubts.filter(Boolean).map((doubt, index) => {
                  const vote = localStorage.getItem("vote_" + doubt.id);

                  return (
                    <div
                      key={doubt.id || index}
                      className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-lg hover:scale-[1.02] transition"
                    >
                      <h2 className="font-semibold text-lg">
                        {doubt.author_name || "Student"}
                      </h2>

                      <p className="text-sm text-gray-200 mt-1">
                        {doubt.text}
                      </p>

                      {doubt.tag && (
                        <span className="inline-block mt-2 text-xs bg-pink-500/80 px-2 py-1 rounded">
                          {doubt.tag}
                        </span>
                      )}

                      {/* VOTING */}
                      <div className="flex gap-4 mt-3 text-xs">

                        {/* 👍 UPVOTE */}
                        <button
                          onClick={() => handleVote(doubt.id, "up")}
                          disabled={vote === "up"}
                          className={`transition ${
                            vote === "up"
                              ? "text-green-400 cursor-not-allowed"
                              : "text-gray-300 hover:text-green-400"
                          }`}
                        >
                          👍 {doubt.upvotes ?? 0}
                        </button>

                        {/* 🔁 UNDO */}
                        <button
                          onClick={() => handleVote(doubt.id, "down")}
                          disabled={vote !== "up"}
                          className={`transition ${
                            vote === "up"
                              ? "text-red-400 hover:text-red-500"
                              : "text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          ↩ Undo
                        </button>

                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TeacherSession;