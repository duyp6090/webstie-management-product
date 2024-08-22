// Import Categories Model
const Categories = require("../../../model/categories.model.js");

// Import fillterStatus
const fillterStatusHelper = require("../../../helper/fillterStatus.js");

// Import search
const searchHelper = require("../../../helper/search.js");

// Import pagination
const paginationHelper = require("../../../helper/pagination.js");

// Class to handle categories - admin
class categoriesController {
    // [GET] categories page
    async getPageCategories(req, res) {
        // Fillter button status
        const fillterStatus = fillterStatusHelper(req.query);

        // Find Object
        let find = {
            deleted: false,
        };

        // Find status
        if (req.query.status) {
            find["status"] = req.query.status == "active" ? "active" : "inactive";
        }

        // Search Helper
        const objectSeacrh = searchHelper(req.query);

        // Find search
        let searchFind = objectSeacrh.regex;

        if (searchFind) {
            find["title"] = searchFind;
        }

        // Pagination

        // Count documents
        const totalProducts = await Categories.countDocuments(find);

        // object - pagination
        let objectPagination = paginationHelper(
            {
                limit: 4,
                currentPage: 1,
            },
            req.query,
            totalProducts
        );

        // Count products deleted
        const totalProductsDeleted = await Categories.countDocuments({
            deleted: true,
        });

        // Object seacrh
        let sort = {};

        // Get type sort and value sort
        const sortParams = req.query.sort;

        // Check type sort
        if (sortParams == undefined) {
            sort["createdAt"] = -1;
        } else {
            // Get type sort and value sort
            const [typeSort, valueSort] = sortParams.split("-");
            sort[typeSort] = valueSort;
        }

        // Get categories
        const categories = await Categories.find(find)
            .sort(sort)
            .limit(objectPagination.limit)
            .skip(objectPagination.skip);

        // Render categories page
        res.render("admin/pages/categories/index.pug", {
            pageTitle: "Categories",
            pageCurrent: "categories",
            categories: categories,
            fillterStatus: fillterStatus,
            searchFind: objectSeacrh.keyword,
            paginations: objectPagination,
            totalProductsDeleted: totalProductsDeleted,
            typeSort: sortParams,
        });
    }

    // [PATCH] change status category
    async changeStatusCategory(req, res) {
        // Get id and status from request
        const id = req.params.id;
        const status = req.params.status;

        // Updated cateogry
        await Categories.findByIdAndUpdate({ _id: id }, { status: status });

        // Redirect to categories page
        res.redirect("back");
    }

    // [DELETE] delete category temporatity
    async deleteCategory(req, res) {
        // Get id from request
        const id = req.params.id;

        // Updated category
        await Categories.findByIdAndUpdate({ _id: id }, { deleted: true });

        // Redirect to categories page
        res.redirect("back");
    }

    // [PATH] change multi status categories
    async changeMultiStatusCategories(req, res) {
        // Get type and ids from request
        const type = req.body.type;
        const ids = req.body.ids.split(",");

        // Object to update
        let optionUpdate = {};

        // Check type
        switch (type) {
            case "active":
                optionUpdate.status = "active";
                break;
            case "inactive":
                optionUpdate.status = "inactive";
                break;
            case "delete":
                optionUpdate.deleted = true;
                break;
        }

        // Update multi status
        await Categories.updateMany({ _id: { $in: ids } }, optionUpdate);

        // Redirect
        res.redirect("back");
    }

    // [GET] create category page
    async getPageCreateCategory(req, res) {
        res.render("admin/pages/categories/create.pug");
    }

    // [POST] create category
    async addCategory(req, res) {
        // Get category from request
        const category = req.body;

        // Add thumbnail to category
        category.thumbnails = `http://localhost:3000/uploads/${req.files["thumbnails"][0].filename}`;

        // Create new category
        const newCategory = new Categories({
            title: category.title,
            parent_id: category.parent_id,
            description: category.desc,
            status: category.status,
            thumbnail: category.thumbnails,
        });

        // Save category
        await newCategory.save();

        // Redirect to categories page
        res.redirect("/admin/categories");
    }

    // [GET] edit category page
    async getPageEditCategory(req, res) {
        // Get id from request
        const id = req.params.id;

        // Get category by id
        const category = await Categories.findById({ _id: id });

        // Render edit category page
        res.render("admin/pages/categories/edit.pug", {
            title: "Chỉnh sửa danh mục",
            category: category,
        });
    }

    // [PATCH] edit category
    async updatedCategory(req, res) {
        // Get id from request
        const id = req.params.id;

        // Get information category from request
        const newCategory = req.body;

        // Check thumbnail
        if (req.files["thumbnails"]) {
            newCategory.thumbnails = `http://localhost:3000/uploads/${req.files["thumbnails"][0].filename}`;
        }

        // Find and update category
        await Categories.findByIdAndUpdate(
            { _id: id },
            {
                title: newCategory.title,
                parent_id: newCategory.parentId,
                description: newCategory.desc,
                status: newCategory.status,
                thumbnail: newCategory.thumbnails,
            }
        );

        // Redirect
        res.redirect("back");
    }

    // [GET] detail category page
    async getDetailCategory(req, res) {
        // Get id from request
        const id = req.params.id;

        // Get category by id
        const category = await Categories.findOne({ _id: id });

        console.log(category);

        // Render detail category page
        res.render("admin/pages/categories/detail.pug", {
            title: "Chi tiết danh mục",
            category: category,
        });
    }
}

module.exports = new categoriesController();
