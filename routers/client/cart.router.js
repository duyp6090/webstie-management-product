// Require express and create a router
const express = require("express");
const router = express.Router();

// Import Controller - Cart Page - Client
const cartController = require("../../controllers/client/pages/cart.controller.js");

// Get cart page
router.get("/", cartController.getCartPage);

// Add product
router.post("/add/:productId", cartController.addProductToCart);

module.exports = router;
