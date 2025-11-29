import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>

      {/* DEFAULT ROUTE → OPEN SIGNUP */}
      <Route path="/" element={<Signup />} />

      {/* SIGNUP PAGE */}
      <Route path="/signup" element={<Signup />} />

      {/* LOGIN PAGE */}
      <Route path="/login" element={<Login />} />

      {/* TEMP HOME PAGE */}
      <Route
        path="/home"
        element={
          <h1 className="text-white text-center mt-10 text-3xl">
            Welcome Home!
          </h1>
        }
      />

    </Routes>
  );
}
