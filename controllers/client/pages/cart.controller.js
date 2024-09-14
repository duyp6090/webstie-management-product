// Import product model
const Product = require("../../../model/product.model.js");

// Import cart model
const Cart = require("../../../model/cart.model.js");

// Class handle cart page
class cartController {
    // [POST] Add product
    async addProductToCart(req, res) {
        // Get product id
        const productId = req.params.productId;

        // Get card id
        const cartId = req.cookies.cartId;

        // Get quantity
        const quantity = parseInt(req.body.quantity);

        // Get cart
        const cart = await Cart.findOne({ _id: cartId });

        // Get list products
        const products = cart.products;

        // Check product
        const product = products.find((product) => product.product_id == productId);

        if (product) {
            // Update quantity products
            product.quantity += quantity;

            // update cart
            await Cart.updateOne(
                { _id: cartId, "products.product_id": productId },
                {
                    $set: {
                        "products.$.quantity": product.quantity,
                    },
                }
            );
        } else {
            // Object card
            const objectCard = {
                product_id: productId,
                quantity: quantity,
            };

            // Find cart
            await Cart.updateOne(
                { _id: cartId },
                {
                    $push: {
                        products: objectCard,
                    },
                }
            );
        }
        // Back
        res.redirect("back");
    }
}

module.exports = new cartController();
