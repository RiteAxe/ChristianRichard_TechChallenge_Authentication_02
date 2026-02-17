const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/authController");

const { verifyToken } = require("../middleware/authMiddleware");

// route untuk register user baru
router.post("/users", registerUser);

// route untuk login
router.post("/auth/login", loginUser);

// route untuk mengambil data user yang sedang login
// menggunakan middleware verifyToken
router.get("/users/me", verifyToken, getCurrentUser);

module.exports = router;
