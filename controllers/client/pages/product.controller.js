// Import model
const Product = require("../../../model/product.model.js");

// Import searchHelper
const searchHelper = require("../../../helper/search.js");

// Class to handle Product Page - Client
class productController {
    // [GET] Products Page
    async getProductsPage(req, res) {
        // Find condition
        let find = {
            availabilityStatus: { $ne: "No Stock" },
        };

        // Search
        let search = searchHelper(req.query);

        if (search.keyword) {
            find["title"] = search.regex;
        }

        // Get all products
        const products = await Product.find(find);

        const newProducts = products.map((product) => {
            product.newPrice = Math.floor(
                product.price - (product.price * product.discountPercentage) / 100
            );
            return product;
        });

        // Render products page
        res.render("client/pages/products/index.pug", {
            products: newProducts,
            searchFind: search.keyword,
        });
    }

    // [GET] Product Detail Page
    async getProductDetailPage(req, res) {
        // Get slug from params
        const slug = req.params.slug;

        // Get product by slug
        const product = await Product.findOne({ slug: slug });

        // Render product detail page
        res.render("client/pages/products/detail-product.pug", {
            product: product,
        });
    }
}

module.exports = new productController();
