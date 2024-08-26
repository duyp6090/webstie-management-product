// Require express and create a router
const express = require("express");
const router = express.Router();

// Import Controller - Role P
const roleController = require("../../controllers/admin/pages/roles.controller.js");

// Get role page
router.get("/", roleController.getRole);

// Get create role's page
router.get("/create", roleController.getPageCreateRole);

// Post create role
router.post("/create", roleController.createRole);

// Get edit role's page
router.get("/edit/:id", roleController.getEditRole);

// Patch edit role
router.patch("/edit/:id", roleController.editRole);

// Get authorization role's page
router.get("/authorization", roleController.getAuthorizationRole);

// Patch authorization role
router.patch("/authorization", roleController.updatedAuthorizationRole);

// Export router
module.exports = router;
