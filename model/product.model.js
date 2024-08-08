// Import mongoose

const mongoose = require("mongoose");

// Create Schema Of Products
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
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
    reviews: [String],
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
});

// Create Model Of Products
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
