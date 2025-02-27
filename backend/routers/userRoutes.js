const express = require("express");
const {
  register,
  login,
  updateUser,
  getUser,
} = require("../controllers/userController.js");

const router = express.Router();

// Sign up route
router.post("/register", register);

// Sign in route
router.post("/login", login);

// Update user route
router.put("/:userId", updateUser).get("/:userId", getUser);

module.exports = router;
