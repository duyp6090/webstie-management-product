// Import product model
const Product = require("../../../model/product.model.js");

// Import category model
const Category = require("../../../model/categories.model.js");

// Import findSubcategories
const findSubcategories = require("../../../helper/findSubCategories.js");

// Import searchHelper
const searchHelper = require("../../../helper/search.js");

// Import calculationDiscountHelper
const calculationDiscountHelper = require("../../../helper/calculationDiscount.js");

// Class to handle Product Page - Client
class productController {
    // [GET] Products Page
    async getProductsPage(req, res) {
        // Find condition
        let find = {
            availabilityStatus: { $ne: "No Stock" },
        };

        // Get all products
        const products = await Product.find(find);

        // Calculation new price for products
        const newProducts = calculationDiscountHelper(products);

        // Get list categories
        const categories = await Category.find({ parent_id: "" });

        // Render products page
        res.render("client/pages/products/index.pug", {
            products: newProducts,
            searchFind: search.keyword,
            categories: categories,
        });
    }

    // [GET] Product Detail Page
    async getProductDetailPage(req, res) {
        // Get slug from params
        const slug = req.params.slug;

        // Get product by slug
        const product = await Product.findOne({ slug: slug });

        const newProduct = calculationDiscountHelper([product]);

        // Get category by product
        const category = await Category.findOne({
            _id: product.category_id,
            deleted: false,
            status: "active",
        });

        // Render product detail page
        res.render("client/pages/products/detail-product.pug", {
            product: newProduct[0],
            category: category,
        });
    }

    // [GET] Products By Category Page
    async getProductsByCategory(req, res) {
        // Get slug from params
        const slug = req.params.slug;

        // Find condition
        let find = {
            availabilityStatus: { $ne: "No Stock" },
        };

        // Get category by slug
        const category = await Category.findOne({ slug: slug });

        // Get all categories
        const categories = await Category.find();

        // Get parent category
        const parentCategories = categories.filter((item) => {
            return item.parent_id == "";
        });

        // Find subcategories
        const subcategories = findSubcategories(category._id.toString(), categories);

        // Find products by category
        const products = await Product.find({
            category_id: { $in: subcategories },
            ...find,
        });

        res.render("client/pages/products/product-by-category.pug", {
            products: products,
            categories: parentCategories,
        });
    }
}

module.exports = new productController();
