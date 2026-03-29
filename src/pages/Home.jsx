import { useEffect, useState, useRef } from "react";
import DoubtForm from "../components/doubt/DoubtForm";
import DoubtList from "../components/doubt/DoubtList";

function Home() {
  const [doubts, setDoubts] = useState([]);
  const topRef = useRef(null);

  const fetchDoubts = async () => {
    try {
      const response = await fetch("http://localhost:8000/doubts");
      if (!response.ok) throw new Error("Backend not responding");
      
      const data = await response.json();
      // Ensure we have an array and show newest first
      const fetched = data.doubts || [];
      setDoubts([...fetched].reverse());

      // Auto-scroll logic
      setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);

    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchDoubts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-10 flex flex-col items-center px-4">
      <div ref={topRef}></div>
      
      {/* 1. THE FORM (DoubtForm already contains the 'AskitPro' title) */}
      <DoubtForm onSubmitSuccess={fetchDoubts} />

      {/* 2. THE LIST (This handles the upvotes) */}
      <DoubtList doubts={doubts} setDoubts={setDoubts} />
    </div>
  );
}

export default Home;