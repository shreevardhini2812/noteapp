import { useAuth } from "../context/useAuth.jsx";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">Notes App</h1>

      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="bg-white text-blue-600 px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}
