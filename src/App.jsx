import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default route → Login */}
        <Route path="/" element={<Login />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Signup Route */}
        <Route path="/signup" element={<Signup />} />

        {/* Home Route */}
        <Route path="/home" element={<h1 className="text-white text-center mt-10">Welcome Home!</h1>} />

      </Routes>
    </BrowserRouter>
  );
}
