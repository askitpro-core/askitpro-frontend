import StatsCard from "../components/teacher/StatsCard";
import FilterTabs from "../components/teacher/FilterTabs";
import DoubtsGrid from "../components/teacher/DoubtsGrid";

import { useEffect, useState } from "react";
import { getDoubts } from "../services/api";

function TeacherDashboard() {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  // 🆕 Step 1: Added search state
  const [searchQuery, setSearchQuery] = useState("");

  // 🔥 Fetch doubts (Updated to handle Search)
  const fetchDoubts = async (query = "") => {
  setLoading(true);
  setError(null); // Clear any old errors before starting
  try {
    let data;
    if (query.trim() !== "") {
      const response = await fetch('http://127.0.0.1:8000/search?query=${query}');
      if (!response.ok) throw new Error("Search failed"); // If server says no
      data = await response.json();
    } else {
      data = await getDoubts();
    }

    const formatted = (data || []).map((d) => ({
      id: d.id,
      title: d.title,
      description: d.description,
      submitted_at: d.submitted_at,
      upvotes: d.upvotes ?? 0,
      resolved: d.resolved ?? false,
    }));

    setDoubts(formatted);
  } catch (err) {
    console.error("Fetch Error:", err);
    // 🆕 Step B: Save the error message
    setError("Unable to load doubts. Please check your connection.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchDoubts();
  }, []);

  // 🆕 Step 3: Handle typing in the search bar
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetchDoubts(value); // Calls the API as you type
  };

  const total = doubts.length;
  const pending = doubts.filter((d) => !d.resolved).length;
  const solved = doubts.filter((d) => d.resolved).length;

  const filteredDoubts = doubts.filter((d) => {
    if (filter === "pending") return !d.resolved;
    if (filter === "solved") return d.resolved;
    return true;
  });

  const handleSolve = (id) => {
    setDoubts((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, resolved: true } : d
      )
    );
  };

  const handleUpvote = async (id) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/doubts/${id}/upvote', {
        method: "POST",
      });
      const result = await res.json();
      if (result.message === "Already voted") return;
      if (result.data && typeof result.data.upvotes === "number") {
        setDoubts((prev) =>
          prev.map((d) =>
            d.id === id ? { ...d, upvotes: result.data.upvotes } : d
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <div className="p-6 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 flex justify-between items-center mb-8 shadow-lg">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-semibold tracking-tight">
              AskItPro 🚀
            </h1>

            {/* 🆕 Step 4: The Search Bar UI */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search doubts..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400 transition-all w-64 placeholder-gray-400"
              />
              {loading && searchQuery && (
                <span className="absolute right-3 top-2.5 text-[10px] animate-pulse">Searching...</span>
              )}
            </div>
          </div>

          <div className="flex gap-6 text-sm text-gray-200">
            <span className="hover:text-white cursor-pointer">Maths</span>
            <span className="hover:text-white cursor-pointer">Physics</span>
            <span className="hover:text-white cursor-pointer">Chemistry</span>
            <span className="hover:text-white cursor-pointer">More ⌄</span>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatsCard label="Total Doubts" value={total} />
          <StatsCard label="Pending" value={pending} />
          <StatsCard label="Solved" value={solved} />
        </div>

        {/* FILTER */}
        <FilterTabs filter={filter} setFilter={setFilter} />

        <div className="flex justify-center mt-6 text-gray-300 animate-bounce">
          ↓ Scroll to view doubts
        </div>
      </div>

{/* BOTTOM SECTION */}
<div className="bg-white/10 backdrop-blur-2xl rounded-t-[40px] px-8 py-10 mt-16 max-w-7xl mx-auto shadow-2xl border-t border-white/20">

        {/* 🆕 Step C: Show Error UI if something went wrong */}
        {error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-white text-lg font-medium">{error}</p>
            <button 
              onClick={() => fetchDoubts(searchQuery)} 
              className="mt-6 px-6 py-2 bg-orange-400 text-black rounded-full font-bold hover:bg-orange-500 transition-all"
            >
              Try Again 🔄
            </button>
          </div>
        ) : (
          <DoubtsGrid
            doubts={filteredDoubts}
            loading={loading}
            onSolve={handleSolve}
            onUpvote={handleUpvote}
          />
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;