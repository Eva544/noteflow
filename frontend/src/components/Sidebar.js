import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import AppLogo from "../AppLogo";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = ({ user, onLogout, email, onUpdateProfile }) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editUsername, setEditUsername] = useState(user || "");
  const [editEmail, setEditEmail] = useState(email || "");

  useEffect(() => {
    setEditUsername(user || "");
    setEditEmail(email || "");
  }, [user, email]);

  const handleSave = async () => {
    try {
      await onUpdateProfile({ username: editUsername, email: editEmail });
      setEditMode(false);
      setOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 250 },
        height: "100vh",
        backgroundColor: "#ffffff",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 10px",
      }}
    >
      {/* App Logo */}
      <Box sx={{ mb: 6 }}>
        <AppLogo />
      </Box>

      {/* Profile Section */}
      {user && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 2,
          }}
        >
          <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
            {editUsername.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h6" sx={{ color: "#000" }}>
            {editUsername}
          </Typography>
        </Box>
      )}

      <Divider sx={{ width: "100%", mb: 4 }} />

      {/* Sidebar Options */}
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Button
          startIcon={<PersonIcon sx={{ color: "#000" }} />}
          variant="text"
          sx={{
            justifyContent: "flex-start",
            pl: 2,
            mb: 1,
            color: "#000",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#000",
            },
          }}
          onClick={() => setOpen(true)}
        >
          Profile
        </Button>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          slotProps={{
            paper: {
              sx: {
                borderRadius: "16px",
                p: 2,
                width: "380px",
                background: "#ffffff",
                boxShadow: "0 8px 28px rgba(0,0,0,0.15)",
              },
            },
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: 700,
              fontSize: "1.4rem",
              textAlign: "center",
              borderBottom: "1px solid #eee",
              pb: 2,
            }}
          >
            User Profile
          </DialogTitle>

          <DialogContent
            sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
          >
            {user ? (
              <>
                {!editMode ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, mb: 1, color: "#333" }}
                    >
                      Username:{" "}
                      <span style={{ color: "#1976d2" }}>{editUsername}</span>
                    </Typography>
                    <Typography sx={{ mb: 3, color: "#555" }}>
                      Email: {editEmail}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 1,
                          py: 1.2,
                          textTransform: "none",
                          fontSize: "1rem",
                          borderRadius: "10px",
                          background: "#1976d2",
                          "&:hover": { background: "#145ea8" },
                        }}
                        onClick={() => setEditMode(true)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          mt: 1,
                          py: 1.2,
                          textTransform: "none",
                          fontSize: "1rem",
                          borderRadius: "10px",
                        }}
                        onClick={() => setOpen(false)}
                      >
                        Close
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <TextField
                      label="Username"
                      variant="outlined"
                      fullWidth
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                    />
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        sx={{
                          flex: 1,
                          py: 1.2,
                          textTransform: "none",
                          fontSize: "1rem",
                          borderRadius: "10px",
                          background: "#1976d2",
                          "&:hover": { background: "#145ea8" },
                        }}
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          flex: 1,
                          py: 1.2,
                          textTransform: "none",
                          fontSize: "1rem",
                          borderRadius: "10px",
                        }}
                        onClick={() => setEditMode(false)}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </>
                )}
              </>
            ) : (
              <Typography textAlign="center">Loading...</Typography>
            )}
          </DialogContent>
        </Dialog>

        <Button
          startIcon={<LogoutIcon sx={{ color: "#000" }} />}
          variant="text"
          sx={{
            justifyContent: "flex-start",
            pl: 2,
            color: "#000",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#000",
            },
          }}
          onClick={onLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
