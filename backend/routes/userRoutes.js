const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Register a new user
router.post("/register", userController.register);

// Verify user email
router.get("/verify/:token", userController.verifyEmail);

// Login user
router.post("/login", userController.login);

// Forgot password
router.post("/forgot-password", userController.forgotPassword);

// Reset password
router.post("/reset-password/:token", userController.resetPassword);

module.exports = router;
