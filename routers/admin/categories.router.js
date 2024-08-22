// Require express and create a router
const express = require("express");
const router = express.Router();

// Import multer
const multer = require("multer");

// Import storage multer
const storage = require("../../helper/storageMulter.js");
const upload = multer({ storage: storage });

// Import Controller - Categories Page - Admin
const categoriesController = require("../../controllers/admin/pages/categories.controller.js");

// Get page categories
router.get("/", categoriesController.getPageCategories);

// Patch change status category
router.patch("/change-status/:status/:id", categoriesController.changeStatusCategory);

// Patch change multi status categories
router.patch("/change-multi", categoriesController.changeMultiStatusCategories);

// Delete category temporatity
router.delete("/delete/:id", categoriesController.deleteCategory);

// Get page edit category
router.get("/edit/:id", categoriesController.getPageEditCategory);

// Patch edit category
router.patch(
    "/edit/:id",
    upload.fields([{ name: "thumbnails", maxcount: 1 }]),
    categoriesController.updatedCategory
);

// Get page create category
router.get("/create", categoriesController.getPageCreateCategory);

// Post create category
router.post(
    "/create",
    upload.fields([
        { name: "thumbnails", maxcount: 1 },
        { name: "images", maxcount: 3 },
    ]),
    categoriesController.addCategory
);

// Get detail page category
router.get("/detail/:id", categoriesController.getDetailCategory);

// Get page categories trash
router.get("/trash", categoriesController.getPageCategoriesTrash);

// Patch restore category
router.patch("/restore/:id", categoriesController.restoreCategory);

// Delete forever category
router.delete("/delete-forever/:id", categoriesController.deleteForeverCategory);

// Patch change multi status categories trash
router.patch("/multi-delete-restore", categoriesController.changeMultiStatusCategoriesTrash);

module.exports = router;
