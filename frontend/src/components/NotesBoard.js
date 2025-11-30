import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";
import { Box, Typography, TextField, Button } from "@mui/material";
import SearchAndFilter from "./SearchAndFilter";

const NotesBoard = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [filter] = useState(""); 


  const fetchNotes = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/notes", {
        withCredentials: true,
      });
      setNotes(data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreateNote = useCallback(async () => {
    if (!title || !body) return;

    try {
      await axios.post(
        "http://localhost:8000/notes/create",
        { title, body },
        { withCredentials: true }
      );
      setTitle("");
      setBody("");
      fetchNotes();
    } catch (err) {
      console.error("Failed to create note:", err);
    }
  }, [title, body, fetchNotes]);

  const filteredNotes = notes.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? n.priority === filter : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        My Notes
      </Typography>

      <Box sx={{ mb: 3 }}>
        <SearchAndFilter
          search={search}
          setSearch={setSearch}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 4,
          maxWidth: "400px",
        }}
      >
        <Typography variant="h4" sx={{ mt: 2, fontWeight: 400 }}>
        Add a New Note
      </Typography>

        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          variant="outlined"
          size="small"
          multiline
          rows={3}
        />
        <Button variant="contained" onClick={handleCreateNote}>
          Create Note
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredNotes.map((note) => (
          <NoteCard key={note._id} note={note} refreshNotes={fetchNotes} />
        ))}
      </Box>
    </Box>
  );
};

export default NotesBoard;
