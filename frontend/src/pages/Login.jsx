import { useState } from "react";
import api from "../api.js";
import { useAuth } from "../context/useAuth.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth", { email, password });
      login(data.token);
      navigate("/notes");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow w-96" onSubmit={submit}>
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 w-full text-white p-2 rounded">
          Login
        </button>

        <p className="text-center text-sm mt-3">
          No account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
