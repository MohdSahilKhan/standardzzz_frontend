import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const isLoggedIn = localStorage.getItem("auth");
  return isLoggedIn ? <Navigate to="/home" /> : children;
}
