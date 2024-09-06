// Require express and create a router
const express = require("express");
const router = express.Router();

// Import multer
const multer = require("multer");

// Import storage multer
const storage = require("../../helper/storageMulter.js");
const upload = multer({ storage: storage });

// Import controller my-account admin
const myAccountController = require("../../controllers/admin/pages/my-account.controller.js");

// Get my account
router.get("/", myAccountController.getMyAccount);

// Get page edit my account
router.get("/edit", myAccountController.getEditMyAccount);

// Patch edit my account
router.patch(
    "/edit",
    upload.fields([{ name: "avatar", maxcount: 1 }]),
    myAccountController.EditMyAccount
);

module.exports = router;
