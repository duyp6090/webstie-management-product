// Import homeRouter
const homeRouter = require("./home.router.js");

// Import productRouter
const productRouter = require("./product.router.js");

// Import searchRouter
const searchRouter = require("./search.router.js");

function webInitRouteClient(app) {
    app.use("/", homeRouter);

    app.use("/product", productRouter);

    app.use("/search", searchRouter);
}

module.exports = webInitRouteClient;
