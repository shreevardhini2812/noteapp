import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", { name, email, password });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow w-96" onSubmit={submit}>
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

        <input
          placeholder="Name"
          className="border p-2 w-full rounded mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 w-full text-white p-2 rounded">
          Register
        </button>

        <p className="text-center text-sm mt-3">
          Have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
