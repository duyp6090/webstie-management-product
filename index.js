//  Create app -  server
const express = require("express");
const app = express();

// Path
const path = require("path");

// Import database
const Database = require("./config/database.js");

// Method override
const methodOverride = require("method-override");

// Config env
require("dotenv").config();

// Port of app
const port = process.env.PORT || 3000;

// Import router
const webInitRouteClient = require("./routers/client/index.router.js");
const webInitRouteAdmin = require("./routers/admin/index.router.js");

// Import System Config
const systemConfig = require("./config/system.js");

// Import cookie - parser
const cookieParser = require("cookie-parser");

// Config view engine
app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);

// Config static file
app.use(express.static(`${__dirname}/public`));

// Config body-parser to pre-handle data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// App Locals Variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Use method override
app.use(methodOverride("_method"));

// TinyMCE
app.use("/tinymce", express.static(path.join(__dirname, "node_modules", "tinymce")));

// Use cookie parser
app.use(cookieParser());

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
