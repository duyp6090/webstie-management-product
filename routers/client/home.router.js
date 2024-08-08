// Require express and create a router
const express = require("express");
const router = express.Router();

// Import Controller - Home Page - Client
const homeController = require("../../controllers/client/pages/home.controller.js");

// Get Products Page
router.get("/", homeController.getHomePage);

module.exports = router;
