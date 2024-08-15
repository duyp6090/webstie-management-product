// Require express and create a router
const express = require("express");
const router = express.Router();

// Import Controller - Product Page - Admin
const productAdminController = require("../../controllers/admin/pages/product.controller.js");

// Product Page - Admin
router.get("/", productAdminController.getProduct);

// Change status product
router.patch("/change-status/:status/:id", productAdminController.changeStatus);

// Chane muilti status products
router.patch("/change-multi", productAdminController.changeStatusMulti);

// Delete product temporatity
router.delete("/delete/:id", productAdminController.deleteProductTemporatity);

// Delete product forever
router.delete("/delete-forever/:id", productAdminController.deleteProduct);

// Get trash product
router.get("/trash", productAdminController.getTrashProduct);

// Delete - Resotre multi product in trash
router.patch("/delete-restore", productAdminController.deleteRestoreMultiProduct);

// Restore product in trash
router.patch("/restore/:id", productAdminController.restoreProduct);

// Create page to add product
router.get("/create", productAdminController.createProduct);

// Add product
router.post("/create", productAdminController.addProduct);

module.exports = router;
