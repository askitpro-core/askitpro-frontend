import StatsCard from "../components/teacher/StatsCard";
import FilterTabs from "../components/teacher/FilterTabs";
import DoubtsGrid from "../components/teacher/DoubtsGrid";

import { useEffect, useState } from "react";
import { getDoubts } from "../services/api";

function TeacherDashboard() {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const data = await getDoubts();

        // Add resolved flag manually
        const formatted = (data.doubts || data).map((d) => ({
          ...d,
          resolved: false,
        }));

        setDoubts(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoubts();
  }, []);

  const total = doubts.length;
  const pending = doubts.filter((d) => !d.resolved).length;
  const solved = doubts.filter((d) => d.resolved).length;

  const filteredDoubts = doubts.filter((d) => {
    if (filter === "pending") return !d.resolved;
    if (filter === "solved") return d.resolved;
    return true;
  });

  // 🔥 Solve handler
  const handleSolve = (id) => {
    setDoubts((prev) =>
      prev.map((d, index) =>
        (d.id ?? index) === id ? { ...d, resolved: true } : d
      )
    );
  };

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">

      {/* TOP SECTION */}
      <div className="p-6 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 flex justify-between items-center mb-8 shadow-lg">
          <h1 className="text-2xl font-semibold tracking-tight">
            AskItPro 🚀
          </h1>

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

        {/* SCROLL HINT */}
        <div className="flex justify-center mt-6 text-gray-300 animate-bounce">
          ↓ Scroll to view doubts
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="bg-white/10 backdrop-blur-2xl rounded-t-[40px] px-8 py-10 mt-16 max-w-7xl mx-auto shadow-2xl border-t border-white/20">

        <DoubtsGrid
          doubts={filteredDoubts}
          loading={loading}
          onSolve={handleSolve}
        />

      </div>
    </div>
  );
}

export default TeacherDashboard;