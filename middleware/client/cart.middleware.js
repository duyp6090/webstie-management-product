const Cart = require("../../model/cart.model.js");

function handleCart(req, res, next) {
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
    }

    // Next to the next middleware
    next();
}

module.exports = handleCart;
