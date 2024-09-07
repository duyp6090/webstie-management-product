// Import product model
const Product = require("../../../model/product.model");

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
        const newFeaturedProducts = featuredProducts.map((product) => {
            product.newPrice = Math.floor(
                product.price - (product.price * product.discountPercentage) / 100
            );
            return product;
        });

        res.render("client/pages/home/index.pug", {
            products: newFeaturedProducts,
        });
    }
}

module.exports = new homeController();
