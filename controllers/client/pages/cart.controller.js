// Import product model
const Product = require("../../../model/product.model.js");

// Import cart model
const Cart = require("../../../model/cart.model.js");

// Class handle cart page
class cartController {
    // [GET] Cart page
    async getCartPage(req, res) {
        // Get cart id
        const cartId = req.cookies.cartId;

        // Get cart
        const cart = await Cart.findOne({ _id: cartId });

        if (cart.products.length > 0) {
            let totalPriceAllProducts = 0;
            for (const product of cart.products) {
                // Get product detail
                const productDetail = await Product.findOne({ _id: product.product_id });

                // calculate new price of product
                productDetail.newPrice = Math.floor(
                    productDetail.price -
                        (productDetail.price * productDetail.discountPercentage) / 100
                );

                // Total price of product
                productDetail.totalPrice = productDetail.newPrice * product.quantity;

                // Total all products
                totalPriceAllProducts += productDetail.totalPrice;

                product.productDetail = productDetail;
            }
            // Assign total all products to cart
            cart.totalPriceAllProducts = totalPriceAllProducts;
        }

        res.render("client/pages/cart/index.pug", {
            title: "Giỏ hàng",
            cartDetail: cart,
        });
    }

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
