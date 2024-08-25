// Import mongoose
const mongoose = require("mongoose");

// Import slugs
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

// Create Schema Of Products
const productSchema = new mongoose.Schema({
    title: String,
    category_id: {
        type: String,
        default: "",
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    rating: {
        type: Number,
        default: 0,
    },
    stock: Number,
    tags: [String],
    brand: String,
    sku: String,
    weight: Number,
    dimensions: {
        depth: Number,
        width: Number,
        height: Number,
    },
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    reviews: {
        type: [Object],
        default: [],
    },
    returnPolicy: String,
    minimumOrderQuantity: Number,
    meta: {
        type: new mongoose.Schema(
            {
                qrCode: String,
                barCode: String,
            },
            {
                _id: false,
                timestamps: true,
            }
        ),
    },
    images: [String],
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
});

// Create Model Of Products
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
