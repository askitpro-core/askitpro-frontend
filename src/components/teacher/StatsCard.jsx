function StatsCard({ label, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl p-5 rounded-2xl 
                    border border-white/20 shadow-md 
                    hover:shadow-xl transition">

      <p className="text-sm text-gray-300 mb-1">
        {label}
      </p>

      <h2 className="text-2xl font-bold">
        {value}
      </h2>
    </div>
  );
}

export default StatsCard;