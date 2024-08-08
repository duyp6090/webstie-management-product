// Import model
const Product = require("../../../model/product.model.js");

// Class to handle Product Page - Client
class productController {
    // Get Products Page
    async getProductsPage(req, res) {
        // Get all products
        const products = await Product.find({});

        const newProducts = products.map((product) => {
            product.newPrice = Math.floor(
                product.price - (product.price * product.discountPercentage) / 100
            );
            return product;
        });

        // Render products page
        res.render("client/pages/products/index.pug", {
            products: products,
        });
    }
}

module.exports = new productController();
