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

// Import Authentication Admin
const authenticationRouter = require("./authentication.router.js");

// Import My-account Admin
const myAccountRouter = require("./my-account.router.js");

// Import Middleware
const requireAuthentication = require("../../middleware/admin/auth.middleware.js");

// Import System Config
const { prefixAdmin } = require("../../config/system.js");

function webInitRouteAdmin(app) {
    app.use(`/${prefixAdmin}/dashboard`, requireAuthentication, dashBoardRouter);

    app.use(`/${prefixAdmin}/products`, requireAuthentication, productRouter);

    app.use(`/${prefixAdmin}/categories`, requireAuthentication, categoryRouter);

    app.use(`/${prefixAdmin}/roles`, requireAuthentication, roleRouter);

    app.use(`/${prefixAdmin}/accounts`, requireAuthentication, accountRouter);

    app.use(`/${prefixAdmin}/auth`, authenticationRouter);

    app.use(`/${prefixAdmin}/my-account`, requireAuthentication, myAccountRouter);
}

module.exports = webInitRouteAdmin;
