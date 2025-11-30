const { Signup, Login, Profile, UpdateProfile, Logout } = require("../controllers/AuthController");
const { verifyToken } = require("../middlewares/AuthMiddleware");  
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.get('/profile', verifyToken, Profile);
router.put("/profile", verifyToken, UpdateProfile);
router.get('/logout', Logout);

module.exports = router;