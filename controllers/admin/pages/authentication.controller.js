// Import account model
const Account = require("../../../model/account.model.js");

// Md5
const md5 = require("md5");

// Class to handle the authentication page
class authenticationController {
    // [GET] admin page login
    getLoginPage(req, res) {
        res.render("admin/pages/authentication/login", {
            pageTitle: "Trang đăng nhập",
        });
    }

    // [POST] admin page login
    async postLogin(req, res) {
        // Get data from form
        const { email, password } = req.body;

        console.log(email, md5(password));

        // Find account has email
        const account = await Account.findOne({ email: email, deleted: false });

        // Check account is exist
        if (account) {
            // Check password is correct
            console.log(account.password, md5(password));
            if (account.password == md5(password)) {
                // Check status account
                if (account.status == "active") {
                    // Redirect to page dashboard
                    res.redirect("/admin/dashboard");
                }
            }
        }
    }
}

// Export module
module.exports = new authenticationController();
