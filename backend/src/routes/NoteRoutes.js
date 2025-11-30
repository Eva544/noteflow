const { getNotes, createNote, updateNote, deleteNote } =require( "../controllers/NoteController");
const { verifyToken } = require("../middlewares/AuthMiddleware");
const router = require("express").Router();

router.get("/", verifyToken, getNotes);
router.post("/create", verifyToken, createNote);
router.put("/update/:id", verifyToken, updateNote);
router.delete("/delete/:id", verifyToken, deleteNote);

module.exports = router;