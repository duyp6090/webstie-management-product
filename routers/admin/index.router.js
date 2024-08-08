// Import Dashboard Admin
const dashBoardRouter = require("./dashboard.router.js");

// Import Product Admini
const productRouter = require("./product.router.js");

// Import System Config
const { prefixAdmin } = require("../../config/system.js");

function webInitRouteAdmin(app) {
    app.use(`/${prefixAdmin}/dashboard`, dashBoardRouter);

    app.use(`/${prefixAdmin}/products`, productRouter);
}

module.exports = webInitRouteAdmin;
