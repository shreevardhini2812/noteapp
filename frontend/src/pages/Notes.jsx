import React, { useEffect, useState } from "react";
import API from "../api";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  // Load notes
  const loadNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      setError("Could not load notes");
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/notes", form);
      setNotes((prev) => [res.data, ...prev]);
      setForm({ title: "", content: "" });
    } catch {
      setError("Failed to create note");
    }
  };

  const startEdit = (note) => {
    setEditing(note);
    setForm({ title: note.title, content: note.content || "" });
  };

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/notes/${editing._id}`, form);
      setNotes((prev) => prev.map((n) => (n._id === res.data._id ? res.data : n)));
      setEditing(null);
      setForm({ title: "", content: "" });
    } catch {
      setError("Failed to update note");
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch {
      setError("Failed to delete note");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Add / Edit Note Form */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">{editing ? "Edit Note" : "New Note"}</h3>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={editing ? updateNote : createNote} className="space-y-2">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={onChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            value={form.content}
            onChange={onChange}
            className="w-full p-2 border rounded"
            rows={4}
          />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-500 text-white rounded">
              {editing ? "Update" : "Create"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setForm({ title: "", content: "" });
                }}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Notes List */}
      <div className="grid md:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div key={note._id} className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold">{note.title}</h4>
            <p className="text-sm mt-2">{note.content}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => startEdit(note)} className="px-3 py-1 bg-yellow-300 rounded">
                Edit
              </button>
              <button
                onClick={() => deleteNote(note._id)}
                className="px-3 py-1 bg-red-400 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
