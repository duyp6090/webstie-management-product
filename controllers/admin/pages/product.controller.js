// Import model
const Product = require("../../../model/product.model.js");

// Class to handle product - Admin
class productAdminController {
    // Get Products Page
    async getProduct(req, res) {
        // Get Products
        const products = await Product.find({
            deleted: false,
        });

        console.log(products);

        res.render("admin/pages/product/index.pug", {
            title: "Products",
            layout: "admin/layouts/layout",
            products: products,
        });
    }
}

module.exports = new productAdminController();
