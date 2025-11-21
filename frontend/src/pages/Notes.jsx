import { useState, useEffect } from "react";
import api from "../api.js";
import { useAuth } from "../context/useAuth.jsx";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await api.get("/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(data);
      } catch (err) {
        alert("Session expired");
        logout();
        navigate("/");
        console.log(err)
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <button
          className="bg-red-600 text-white px-3 py-1 rounded"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id} className="p-4 border rounded shadow">
              <h2 className="font-bold">{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))
        ) : (
          <p>No notes yet.</p>
        )}
      </div>
    </div>
  );
}
