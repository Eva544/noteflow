const User = require("../models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      sameSite:"lax",
    });
    res
      .status(201)
      .json({  success: true, message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({success: false, message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({success: false, message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       httpOnly: false,
       sameSite:"lax",
       path:"/",
     });
     res.status(201).json({ success: false, message: "User logged in successfully", success: true });
     next()
  } catch (error) {
     res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports.Profile = async (req, res, next) => {
  res.json({
    status: true,
    user: {
      username: req.user.username,
      email: req.user.email
    }
  });
};

module.exports.UpdateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username, email },
      { new: true, runValidators: true }
    ).select("username email");

    res.status(200).json({ success: true, message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports.Logout = async (req, res) => {
  res.clearCookie("token", { path: "/", sameSite: "lax", secure: false });
  res.json({ status: true });
};