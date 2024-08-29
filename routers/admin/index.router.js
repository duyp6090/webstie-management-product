// Import Dashboard Admin
const dashBoardRouter = require("./dashboard.router.js");

// Import Product Admin
const productRouter = require("./product.router.js");

// Import Category Admin
const categoryRouter = require("./categories.router.js");

// Import Role Admin
const roleRouter = require("./role.router.js");

// Import Account Admin
const accountRouter = require("./account.router.js");

// Import System Config
const { prefixAdmin } = require("../../config/system.js");

function webInitRouteAdmin(app) {
    app.use(`/${prefixAdmin}/dashboard`, dashBoardRouter);

    app.use(`/${prefixAdmin}/products`, productRouter);

    app.use(`/${prefixAdmin}/categories`, categoryRouter);

    app.use(`/${prefixAdmin}/roles`, roleRouter);

    app.use(`/${prefixAdmin}/accounts`, accountRouter);
}

module.exports = webInitRouteAdmin;
