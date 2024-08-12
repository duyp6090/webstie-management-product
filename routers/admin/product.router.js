// Require express and create a router
const express = require("express");
const router = express.Router();

// Import Controller - Product Page - Admin
const productAdminController = require("../../controllers/admin/pages/product.controller.js");

// Get Product Page - Admin
router.get("/", productAdminController.getProduct);
router.patch("/change-status/:status/:id", productAdminController.changeStatus);

module.exports = router;
