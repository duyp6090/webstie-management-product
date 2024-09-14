// Import mongoose
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user_Id: String,
        products: [
            {
                product_id: String,
                quantity: Number,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model("Carts", cartSchema, "carts");

module.exports = Cart;
