// Import System Config
const { prefixAdmin } = require("../../config/system.js");

// Import model account
const Account = require("../../model/account.model.js");

// Import model role
const Role = require("../../model/role.model.js");

async function requireAuthentication(req, res, next) {
    // Get the token from the request cookie
    const token = req.cookies.token;

    // Check if the token is not exist
    if (!token) {
        res.redirect(`/${prefixAdmin}/auth/login`);
    } else {
        // Get user by token respectively
        const account = await Account.findOne({ token: token }).select("-password");

        // Check if the account is not exist
        if (!account) {
            res.redirect(`/${prefixAdmin}/auth/login`);
        } else {
            // Get role by account
            const role = await Role.findOne({ _id: account.roleId }).select("title permissions");

            // Save account to locals
            res.locals.account = account;

            // Save role to locals
            res.locals.role = role;

            // Next to the next middleware
            next();
        }
    }
}

// Export the middleware
module.exports = requireAuthentication;
