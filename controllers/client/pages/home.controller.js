// Import product model
const Product = require("../../../model/product.model");

// Import calculateDiscountHelper
const calculateDiscountHelper = require("../../../helper/calculationDiscount.js");

// Class to handdle Home Page - Client
class homeController {
    // Get Home Page
    async getHomePage(req, res) {
        // Get featured products
        const featuredProducts = await Product.find({
            featured: "featured",
            deleted: false,
            availabilityStatus: "Stock",
        });

        // Calculation new price
        const newFeaturedProducts = calculateDiscountHelper(featuredProducts);

        // Get new products with created date
        const latestProducts = await Product.find({
            deleted: false,
            availabilityStatus: "Stock",
        }).sort({ "createBy.createdAt": -1 });

        // Calculation new price
        const newLatestProducts = calculateDiscountHelper(latestProducts);

        res.render("client/pages/home/index.pug", {
            products: newFeaturedProducts,
            newProducts: newLatestProducts,
        });
    }
}

module.exports = new homeController();
