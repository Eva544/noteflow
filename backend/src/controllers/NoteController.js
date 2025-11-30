const Note = require("../models/NoteModel.js");

module.exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.createNote = async (req, res) => {
  try {
    const { title, body } = req.body;
    const newNote = await Note.create({ title, body, userId: req.user.id });
    res.json(newNote);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, body },
      { new: true }
    );

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
