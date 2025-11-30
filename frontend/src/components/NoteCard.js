import { useState } from "react";
import { Card, CardContent, Typography, IconButton, Box, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

const NoteCard = ({ note, refreshNotes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editBody, setEditBody] = useState(note.body);

  // Delete note
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/notes/delete/${note._id}`, { withCredentials: true });
      refreshNotes();
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  // Update note
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/notes/update/${note._id}`, {
        title: editTitle,
        body: editBody,
      },
    { withCredentials: true });
      setIsEditing(false);
      refreshNotes();
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  };

  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 3,
        boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
        background: "white",
      }}
    >
      <CardContent>
        {isEditing ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              size="small"
            />
            <TextField
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              size="small"
              multiline
              rows={3}
            />
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleUpdate}
              sx={{ mt: 1 }}
            >
              Save
            </Button>
          </Box>
        ) : (
          <>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {note.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
              {note.body}
            </Typography>
          </>
        )}

        <Box display="flex" justifyContent="flex-end" gap={1}>
          <IconButton size="small" onClick={() => setIsEditing(!isEditing)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
