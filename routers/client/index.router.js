// Import Middlewares Client
const homeRouter = require("./home.router.js");
const productRouter = require("./product.router.js");

function webInitRouteClient(app) {
    app.use("/", homeRouter);

    app.use("/product", productRouter);
}

module.exports = webInitRouteClient;
