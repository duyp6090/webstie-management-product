// Require express and create a router
const express = require("express");
const router = express.Router();

// Import Controller - Dashboard Page - Admin
const dashBoardController = require("../../controllers/admin/pages/dashboard.controller.js");

// Get dashboard Page
router.get("/", dashBoardController.getDashboard);

module.exports = router;
