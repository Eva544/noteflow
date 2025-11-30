import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  TextField,
  Button,
  Paper,
  InputAdornment,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import AppLogo from "./AppLogo";

const MotionBox = motion(Box);

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/auth/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <>
      <MotionBox
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ type: "tween", duration: 0.4}}
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <AppLogo />
        <Box
          sx={{
            minHeight: "100vh",
            bgcolor: "#fff",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              flex: 1,
              width: "100%",
              height: { xs: "250px", md: "100vh" },
            }}
          >
            <img
              src="/media/signup.jpg"
              alt="signup"
              style={{
                width: "100%",
                height: "100vh",
                objectFit: "cover",
              }}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
            <Paper
              elevation={4}
              sx={{
                p: 4,
                width: { xs: "90%", md: "350px" },
                borderRadius: 4,
              }}
              component="form"
              onSubmit={handleSubmit}
            >
              <Stack spacing={2} alignItems="center">
                <h2>Create an Account</h2>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  margin="normal"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailRoundedIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  name="username"
                  value={username}
                  onChange={handleOnChange}
                  margin="normal"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleRoundedIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  margin="normal"
                  type="password"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockRoundedIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Button variant="contained" fullWidth type="submit">
                  Submit
                </Button>
                <span style={{ textAlign: "center" }}>
                  Already have an account? <Link to={"/login"}>Sign in</Link>
                </span>
              </Stack>
            </Paper>
            <ToastContainer />
          </Box>
        </Box>
      </MotionBox>
    </>
  );
};

export default Signup;
