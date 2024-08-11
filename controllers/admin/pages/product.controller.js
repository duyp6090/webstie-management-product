// Import model
const Product = require("../../../model/product.model.js");

// Import fillterStatus
const fillterStatusHelper = require("../../../helper/fillterStatus.js");

// Import search
const searchHelper = require("../../../helper/search.js");

// Import pagination
const paginationHelper = require("../../../helper/pagination.js");

// Class to handle product - Admin
class productAdminController {
    // Get Products Page
    async getProduct(req, res) {
        // Fillter button status
        const fillterStatus = fillterStatusHelper(req.query);

        // Find Condition
        let find = {
            deleted: false,
        };

        // Status Find
        let statusFind = req.query.status;

        if (statusFind == "active") {
            find["availabilityStatus"] = { $ne: "No Stock" };
        } else if (statusFind == "inactive") {
            find["availabilityStatus"] = "No Stock";
        }

        // Search Helper
        const objectSeacrh = searchHelper(req.query);

        // Search Find
        let searchFind = objectSeacrh.regex;

        if (searchFind) {
            find["title"] = searchFind;
        }

        // Pagination

        // Count documents
        const totalProducts = await Product.countDocuments(find);

        // object - pagination
        let objectPagination = paginationHelper(
            {
                limit: 4,
                currentPage: 1,
            },
            req.query,
            totalProducts
        );

        // Get Products
        const products = await Product.find(find)
            .limit(objectPagination.limit)
            .skip(objectPagination.skip);

        res.render("admin/pages/product/index.pug", {
            title: "Products",
            products: products,
            fillterStatus: fillterStatus,
            searchFind: objectSeacrh.keyword,
            paginations: objectPagination,
        });
    }
}

module.exports = new productAdminController();
