import express from "express";
import auth from "../middleware/auth.js";
import Note from "../models/Note.js";


const router = express.Router();


router.get("/", auth, async (req, res) => {
try {
const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
res.json(notes);
} catch (err) {
console.error(err.message);
res.status(500).send("Server error");
}
});


router.post("/", auth, async (req, res) => {
try {
const note = await Note.create({ user: req.user.id, title: req.body.title, content: req.body.content });
res.json(note);
} catch (err) {
console.error(err.message);
res.status(500).send("Server error");
}
});


router.put("/:id", auth, async (req, res) => {
try {
const note = await Note.findById(req.params.id);
if (!note) return res.status(404).json({ msg: "Note not found" });
if (note.user.toString() !== req.user.id) return res.status(401).json({ msg: "Not authorized" });


note.title = req.body.title ?? note.title;
note.content = req.body.content ?? note.content;
note.updatedAt = Date.now();
await note.save();


res.json(note);
} catch (err) {
console.error(err.message);
res.status(500).send("Server error");
}
});


router.delete("/:id", auth, async (req, res) => {
try {
const note = await Note.findById(req.params.id);
if (!note) return res.status(404).json({ msg: "Note not found" });
if (note.user.toString() !== req.user.id) return res.status(401).json({ msg: "Not authorized" });


await note.deleteOne();
res.json({ msg: "Note removed" });
} catch (err) {
console.error(err.message);
res.status(500).send("Server error");
}
});


export default router;