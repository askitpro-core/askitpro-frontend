import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TeacherDashboard from "./pages/TeacherDashboard";
import JoinSession from "./components/session/JoinSession";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Student UI */}
        <Route path="/" element={<Home />} />
        <Route path="/join-session" element={<JoinSession />} />

        {/* Teacher UI */}
        <Route path="/teacher" element={<TeacherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;