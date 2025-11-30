const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ status: false, message: "No token" });

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) return res.status(401).json({ status: false, message: "Invalid token" });

    const user = await User.findById(data.id).select("username email");
    if (!user) return res.status(401).json({ status: false, message: "User not found" });

    req.user = user;   
    next();            
  });
};
