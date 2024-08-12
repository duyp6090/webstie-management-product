// Require express and create a router
const express = require("express");
const router = express.Router();

// Import Controller - Product Page - Admin
const productAdminController = require("../../controllers/admin/pages/product.controller.js");

// Get Product Page - Admin
router.get("/", productAdminController.getProduct);

// Patch to change status
router.patch("/change-status/:status/:id", productAdminController.changeStatus);

// Patch to chane muilti status
router.patch("/change-multi", productAdminController.changeStatusMulti);

module.exports = router;
