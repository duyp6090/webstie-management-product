const express = require("express");
const Database = require("./config/database.js");
const app = express();

// Config env
require("dotenv").config();

// Port of app
const port = process.env.PORT || 3000;

// Import router
const webInitRouteClient = require("./routers/client/index.router.js");
const webInitRouteAdmin = require("./routers/admin/index.router.js");

// Import System Config
const systemConfig = require("./config/system.js");

// Config view engine
app.set("view engine", "pug");
app.set("views", "./views");

// Config static file
app.use(express.static("public"));

// Config body-parser to pre-handle data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// App Locals Variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Use Amin router
webInitRouteAdmin(app);

// Use Client router
webInitRouteClient(app);

//  Connect to databse
Database.connect();

// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
