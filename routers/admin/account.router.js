// Require express and create a router
const express = require("express");
const router = express.Router();

// Import multer
const multer = require("multer");

// Import storage multer
const storage = require("../../helper/storageMulter.js");
const upload = multer({ storage: storage });

// Import controller - Account Page - Admin
const accountsController = require("../../controllers/admin/pages/account.controller.js");

// Get page account
router.get("/", accountsController.getPageAccount);

// Get page create account
router.get("/create", accountsController.getPageCreateAccount);

// Post create account
router.post(
    "/create",
    upload.fields([{ name: "avatar", maxcount: 1 }]),
    accountsController.postCreateAccount
);

// Change status account
router.patch("/change-status/:status/:id", accountsController.changeStatusAccount);

// Change multi status account
router.patch("/change-multi", accountsController.changeMultiStatusAccount);

// Get page edit account
router.get("/edit/:id", accountsController.getPageEditAccount);

// Patch edit account
router.patch(
    "/edit/:id",
    upload.fields([{ name: "avatar", maxcount: 1 }]),
    accountsController.editAccount
);

// Get page detail account
router.get("/detail/:id", accountsController.getPageDetailAccount);

// Delete account temporarily
router.delete("/delete/:id", accountsController.deleteAccountTemporarily);

// Module exports
module.exports = router;
