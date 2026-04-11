import { useState, useEffect } from "react";
import SessionHeader from "../components/session/SessionHeader";
import {
  getDoubts,
  searchDoubts,
  getClusterSummary,
} from "../services/api";

function TeacherSession() {

  const [sessionId, setSessionId] = useState(() => {
    return localStorage.getItem("sessionId") || null;
  });

  const [doubts, setDoubts] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [summaries, setSummaries] = useState({});
  const [loadingSummary, setLoadingSummary] = useState({});

  // 🔥 FETCH
  useEffect(() => {
    if (!sessionId) return;
    getDoubts(sessionId).then(setDoubts);
  }, [sessionId]);

  // 🔥 WS
  useEffect(() => {
    if (!sessionId) return;

    const ws = new WebSocket(`ws://localhost:8000/ws/${sessionId}`);

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === "NEW_DOUBT") {
        setDoubts((prev) => {
          if (prev.some((d) => d.id === msg.data.id)) return prev;
          return [msg.data, ...prev];
        });
      }
    };

    return () => ws.close();
  }, [sessionId]);

  // 🔍 SEARCH
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const t = setTimeout(async () => {
      setIsSearching(true);
      const res = await searchDoubts(query);
      setSearchResults(res);
      setIsSearching(false);
    }, 400);

    return () => clearTimeout(t);
  }, [query]);

  // 🧠 SUMMARY
  const handleSummary = async (clusterId) => {
    if (summaries[clusterId]) return;

    setLoadingSummary((p) => ({ ...p, [clusterId]: true }));

    const s = await getClusterSummary(clusterId);

    setSummaries((p) => ({ ...p, [clusterId]: s }));
    setLoadingSummary((p) => ({ ...p, [clusterId]: false }));
  };

  // 👍 VOTE
  const handleVote = async (id, type) => {
    const vote = localStorage.getItem("vote_" + id);

    if (type === "up" && vote !== "up") {
      setDoubts((prev) =>
        prev.map((d) =>
          d.id === id ? { ...d, upvotes: (d.upvotes ?? 0) + 1 } : d
        )
      );

      localStorage.setItem("vote_" + id, "up");

      await fetch(`http://127.0.0.1:8000/doubts/${id}/upvote`, {
        method: "POST",
      });
    }

    if (type === "down" && vote === "up") {
      setDoubts((prev) =>
        prev.map((d) =>
          d.id === id
            ? { ...d, upvotes: Math.max(0, (d.upvotes ?? 0) - 1) }
            : d
        )
      );

      localStorage.removeItem("vote_" + id);
    }
  };

  // 🧠 CLUSTER
  const grouped = Object.values(
    doubts.reduce((acc, d) => {
      const key = d.cluster_id || "general";
      if (!acc[key]) {
        acc[key] = { tag: d.tag || "General", doubts: [], cluster_id: key };
      }
      acc[key].doubts.push(d);
      return acc;
    }, {})
  );

  const priority = grouped.reduce((m, g) => {
    if (!m) return g;
    return g.doubts.length > m.doubts.length ? g : m;
  }, null);

  // 🎯 KEYWORD HIGHLIGHT
  const highlight = (text) => {
    const keywords = ["react", "error", "api", "state", "hook"];
    let result = text;

    keywords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      result = result.replace(
        regex,
        `<span class="text-yellow-300">$1</span>`
      );
    });

    return result;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white">

      {/* 📊 FLOATING STATS */}
      <div className="fixed right-6 top-24 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-xs space-y-2 shadow-lg">
        <p>📊 Stats</p>
        <p>Total: {doubts.length}</p>
        <p>Clusters: {grouped.length}</p>
        <p>Top: {priority?.tag || "-"}</p>
      </div>

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-4xl font-bold text-center mb-6 tracking-tight">
          🚀 Live Classroom Dashboard
        </h1>

        {!sessionId ? (
          <div className="flex justify-center">
            <button
              onClick={() => {
                localStorage.setItem("sessionId", "CS101");
                setSessionId("CS101");
              }}
              className="px-8 py-3 rounded-xl bg-white text-black font-medium hover:scale-105 transition"
            >
              Start Session
            </button>
          </div>
        ) : (
          <>
            <SessionHeader sessionId={sessionId} />

            {/* SEARCH */}
            <div className="mt-6 mb-8">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="🔍 Ask anything... (AI search)"
                className="w-full px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            {query ? (
              <div>
                <p className="text-sm text-gray-300 mb-2">
                  {isSearching ? "Searching..." : "Results"}
                </p>

                {searchResults.map((d) => (
                  <div className="bg-white/10 p-4 rounded-xl mb-3 hover:bg-white/20 transition">
                    {d.text}
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* PRIORITY */}
                {priority && (
                  <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 shadow-lg">
                    <p className="text-xs text-red-300">🔥 PRIORITY</p>
                    <h2 className="text-xl font-semibold">{priority.tag}</h2>
                    <p className="text-sm text-gray-300">
                      {priority.doubts.length} students stuck
                    </p>
                  </div>
                )}

                {/* CLUSTERS */}
                {grouped.map((g) => (
                  <div className="mb-6 p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-400/30 transition">

                    <div className="flex justify-between items-center mb-3">
                      <h2 className="text-lg font-semibold text-pink-300">
                        {g.tag}
                      </h2>

                      <button
                        onClick={() => handleSummary(g.cluster_id)}
                        className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition hover:scale-105"
                      >
                        ✨ Summarize
                      </button>
                    </div>

                    {loadingSummary[g.cluster_id] && (
                      <p className="text-xs text-gray-400">Generating...</p>
                    )}

                    {summaries[g.cluster_id] && (
                      <div
                        className="mb-3 p-3 bg-purple-500/20 rounded-xl text-sm"
                        dangerouslySetInnerHTML={{
                          __html: "🧠 " + highlight(summaries[g.cluster_id]),
                        }}
                      />
                    )}

                    {g.doubts.map((d) => {
                      const vote = localStorage.getItem("vote_" + d.id);

                      return (
                        <div className="bg-white/10 p-4 rounded-xl mb-3 hover:scale-[1.02] hover:bg-white/20 transition-all duration-200">

                          <p className="text-sm">{d.text}</p>

                          <div className="flex gap-4 mt-3 text-xs">

                            <button
                              onClick={() => handleVote(d.id, "up")}
                              disabled={vote === "up"}
                              className="hover:scale-110 transition"
                            >
                              👍 {d.upvotes ?? 0}
                            </button>

                            <button
                              onClick={() => handleVote(d.id, "down")}
                              disabled={vote !== "up"}
                              className="hover:scale-110 transition text-gray-400 hover:text-red-400"
                            >
                              ↩ Undo
                            </button>

                          </div>

                        </div>
                      );
                    })}
                  </div>
                ))}
              </>
            )}

          </>
        )}
      </div>
    </div>
  );
}

export default TeacherSession;