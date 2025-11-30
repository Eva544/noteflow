import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NotesBoard from "./components/NotesBoard";
import Sidebar from "./components/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["token"]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/auth/profile",
          {
            withCredentials: true,
          }
        );

        if (!data.status) {
          // token invalid or expired
          removeCookie("token", { path: "/" });
          navigate("/login");
        } else {
          setUsername(data.user.username);
          setEmail(data.user.email);
          toast(`Hello ${data.user.username}`);
        }
      } catch (err) {
        removeCookie("token", { path: "/" });
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate, removeCookie]);

  // Handle profile update
  const handleUpdateProfile = async ({ username, email }) => {
  try {
    const { data } = await axios.put(
      "http://localhost:8000/auth/profile",
      { username, email },
      { withCredentials: true }
    );

    if (data.success) {
      setUsername(data.user.username);
      setEmail(data.user.email);
      toast.success("Profile updated successfully!");
    } else {
      toast.error(data.message || "Failed to update profile.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error updating profile.");
  }
};

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/auth/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.log("Logout error:", err);
    }

    removeCookie("token", {
      path: "/",
      sameSite: "lax",
      secure: false,
    });
    navigate("/signup");
  };

  return (
    <UserContext.Provider value={username}>
      <Box display="flex" height="100vh" sx={{ backgroundColor: "#f7f8fa" }}>
        <Box
          sx={{
            width: { xs: "0", sm: "250px" }, 
            flexShrink: 0,
          }}
        >
          <Sidebar user={username} email={email} onLogout={handleLogout} onUpdateProfile={handleUpdateProfile}/>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            ml: {  xs: "20px", sm: "30px", md: "40px", lg: "50px" }, // margin handled by flex
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" }, 
          }}
        >
          <NotesBoard />
        </Box>

        <ToastContainer />
      </Box>
    </UserContext.Provider>
  );
};

export default Dashboard;
