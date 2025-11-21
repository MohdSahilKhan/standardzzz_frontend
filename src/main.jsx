import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";   // <-- Added Home page

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Default Route → Go to Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth Pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Home Page */}
        <Route path="/home" element={<Home />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
