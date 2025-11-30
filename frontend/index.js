require("dotenv").config( );
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const cookieParser = require("cookie-parser");
const authRoute = require("./src/routes/AuthRoutes");
const noteRoute = require("./src/routes/NoteRoutes");
const uri = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/auth", authRoute);

app.use("/notes", noteRoute);

