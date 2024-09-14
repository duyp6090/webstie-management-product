// Import homeRouter
const homeRouter = require("./home.router.js");

// Import productRouter
const productRouter = require("./product.router.js");

// Import searchRouter
const searchRouter = require("./search.router.js");

// Import cartRouter
const cartRouter = require("./cart.router.js");

// Import cartMiddleware
const cartMiddleware = require("../../middleware/client/cart.middleware.js");

function webInitRouteClient(app) {
    // Use cartMiddleware
    app.use(cartMiddleware);

    app.use("/", homeRouter);

    app.use("/product", productRouter);

    app.use("/search", searchRouter);

    app.use("/cart", cartRouter);
}

module.exports = webInitRouteClient;
