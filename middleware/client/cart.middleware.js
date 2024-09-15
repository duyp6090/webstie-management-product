const Cart = require("../../model/cart.model.js");

async function handleCart(req, res, next) {
    // Check cookie cart id
    if (!req.cookies.cartId) {
        // Create new cart
        const cart = new Cart();

        //  Save to database
        cart.save();

        // Set expires time one year
        const expiresTime = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

        // Set cookie cart id one year
        res.cookie("cartId", cart._id, {
            expires: expiresTime,
        });
    } else {
        // Get cart by id
        const cart = await Cart.findById({
            _id: req.cookies.cartId,
        });

        // Get quantity of products in cart
        cart.totalQuantity = cart.products.reduce((total, product) => {
            return total + product.quantity;
        }, 0);

        // save to locals
        res.locals.miniCart = cart;
    }

    // Next to the next middleware
    next();
}

module.exports = handleCart;
