// Require express and create a router
const express = require("express");
const router = express.Router();

//  Import Controller - Search Page - Client
const searchController = require("../../controllers/client/pages/search.controller.js");

// Get Search Page
router.get("/", searchController.getSearchPage);

module.exports = router;
