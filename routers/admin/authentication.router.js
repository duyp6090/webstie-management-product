// Require express and create a router
const express = require("express");
const router = express.Router();

// Import Controller - Authentication Page - Admin
const authenticationController = require("../../controllers/admin/pages/authentication.controller.js");

// Get authentication page
router.get("/login", authenticationController.getLoginPage);

// Post authentication page (check login)
router.post("/login", authenticationController.postLogin);

// Get logout
router.get("/logout", authenticationController.logOut);

// Export router
module.exports = router;
