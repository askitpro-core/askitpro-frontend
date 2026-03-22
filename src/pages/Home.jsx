import { useEffect, useState, useRef } from "react";
import DoubtForm from "../components/doubt/DoubtForm";
import DoubtList from "../components/doubt/DoubtList";
import { getDoubts } from "../services/api";

function Home() {
  const [doubts, setDoubts] = useState([]);
  const topRef = useRef(null);

  const fetchDoubts = async () => {
    try {
      const data = await getDoubts();
      const fetched = data.doubts || data;

      setDoubts(fetched.reverse()); // newest first

      // 🔥 auto scroll
      setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDoubts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center 
                    bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4 py-10">

      <div ref={topRef}></div>

      <DoubtForm onSubmitSuccess={fetchDoubts} />

      <DoubtList doubts={doubts} />

    </div>
  );
}

export default Home;