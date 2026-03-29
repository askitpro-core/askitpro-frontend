function FilterTabs({ filter, setFilter }) {
  return (
    <div className="flex gap-3 mb-4">

      {["all", "pending", "solved"].map(f => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-5 py-2 rounded-full text-sm capitalize font-medium transition-all
            ${filter === f
              ? "bg-orange-400 text-black shadow-md"
              : "bg-white/20 text-gray-200 hover:bg-white/30"
            }`}
        >
          {f}
        </button>
      ))}

    </div>
  );
}

export default FilterTabs;