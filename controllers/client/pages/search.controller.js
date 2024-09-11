// Import product model
const Product = require("../../../model/product.model.js");

// Import searchHelper
const searchHelper = require("../../../helper/search.js");

// Import calculationDiscountHelper
const calculationDiscountHelper = require("../../../helper/calculationDiscount.js");

// Class to handle Search Page - Client
class searchController {
    // [GET] Search Page
    async getSearchPage(req, res) {
        // Get keyword from query
        const keyword = req.query.keyword;

        // New products
        let newProducts = [];

        // Find condition
        let find = {
            availabilityStatus: { $ne: "No Stock" },
            deleted: false,
        };

        if (keyword) {
            // Object search
            const searchFind = searchHelper(req.query);

            if (searchFind) {
                find["title"] = searchFind.regex;
            }

            // Get all products
            const products = await Product.find(find);

            // Calculation new price for products
            newProducts = calculationDiscountHelper(products);
        }

        res.render("client/pages/search/index.pug", {
            title: "Kết quả tìm kiếm",
            keyword: keyword,
            products: newProducts,
        });
    }
}

module.exports = new searchController();
