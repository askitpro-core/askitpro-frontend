import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TeacherDashboard from "./pages/TeacherDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Student UI */}
        <Route path="/" element={<Home />} />

        {/* Teacher UI */}
        <Route path="/teacher" element={<TeacherDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;