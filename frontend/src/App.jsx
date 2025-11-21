import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Notes from "./pages/Notes.jsx";

export default function App() {
  const { token } = useAuth();

  return (
    <Routes>
      {/* Login page at "/" */}
      <Route path="/" element={token ? <Navigate to="/notes" /> : <Login />} />

      {/* Register page */}
      <Route path="/register" element={<Register />} />

      {/* Notes page (protected) */}
      <Route path="/notes" element={token ? <Notes /> : <Navigate to="/" />} />

      {/* Redirect /login to / */}
      <Route path="/login" element={<Navigate to="/" />} />

      {/* Catch-all: redirect unknown paths to / */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
