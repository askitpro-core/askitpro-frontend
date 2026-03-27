import TeacherDoubtCard from "./TeacherDoubtCard";

function DoubtsGrid({ doubts, loading, onSolve }) {
  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (doubts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-300">
        <div className="text-5xl mb-4">📭</div>

        <p className="text-lg font-medium">
          No doubts yet
        </p>

        <p className="text-sm text-gray-400 mt-1">
          Students haven't asked anything yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {doubts.map((doubt, index) => (
        <TeacherDoubtCard
          key={index}
          doubt={doubt}
          onSolve={onSolve}
          id={doubt.id ?? index}
        />
      ))}
    </div>
  );
}

export default DoubtsGrid;