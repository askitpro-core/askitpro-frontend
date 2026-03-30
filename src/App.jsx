import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TeacherDashboard from "./pages/TeacherDashboard";
import SessionHeader from "./components/session/SessionHeader";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Student UI */}
        <Route path="/" element={<Home />} />

        {/* Teacher UI */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        {/* session */}
        <Route path="/teacher/live" element={<SessionHeader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
