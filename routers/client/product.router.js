// Require express and create a router
const express = require("express");
const router = express.Router();

//  Import Controller - Product Page - Client
const productController = require("../../controllers/client/pages/product.controller.js");

// Get Products Page
router.get("/", productController.getProductsPage);

module.exports = router;
