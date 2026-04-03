import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentSession from "./pages/StudentSession";
import TeacherSession from "./pages/TeacherSession";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Old */}
        <Route path="/" element={<Home />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />

        {/* New Session Flow */}
        <Route path="/join-session" element={<StudentSession />} />
        <Route path="/teacher" element={<TeacherSession />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;