import api from "../api";

export default function NoteCard({ note, refresh }) {
  const deleteNote = async () => {
    await api.delete(`/notes/${note._id}`);
    refresh();
  };

  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-bold text-lg">{note.title}</h3>
      <p className="text-sm text-gray-600">{note.content}</p>

      <button
        onClick={deleteNote}
        className="bg-red-600 text-white px-3 py-1 rounded mt-2"
      >
        Delete
      </button>
    </div>
  );
}
