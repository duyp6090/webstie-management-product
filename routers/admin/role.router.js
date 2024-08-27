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

// Delete role temporarily
router.delete("/delete/:id", roleController.deleteRoleTemporarily);

// Delete role forever
router.delete("/delete-forever/:id", roleController.deleteRoleForever);

// Get trash role's page
router.get("/trash", roleController.getTrashRole);

// Patch restore role
router.patch("/restore/:id", roleController.restoreRole);

// Get detail page role
router.get("/detail/:id", roleController.getDetailRole);

// Get authorization role's page
router.get("/authorization", roleController.getAuthorizationRole);

// Patch authorization role
router.patch("/authorization", roleController.updatedAuthorizationRole);

// Export router
module.exports = router;
