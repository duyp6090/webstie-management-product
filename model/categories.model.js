// Import mongoose
const mongoose = require("mongoose");

// Import slugs
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

// Create Schema Of Products
const categoriesSchema = new mongoose.Schema(
    {
        title: String,
        parent_id: {
            type: String,
            default: "",
        },
        description: String,
        status: String,
        thumbnail: String,
        slug: {
            type: String,
            slug: "title",
            unique: true,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Create Model Of Products
const Categories = mongoose.model("Categories", categoriesSchema, "products-category");

module.exports = Categories;
