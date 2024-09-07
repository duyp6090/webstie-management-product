// Import account model
const Account = require("../../../model/account.model.js");

// Import md5
const md5 = require("md5");

// Class to handle my account
class myAccountController {
    async getMyAccount(req, res) {
        res.render("admin/pages/my-account/index.pug", {
            title: "My Account",
        });
    }

    async getEditMyAccount(req, res) {
        res.render("admin/pages/my-account/edit.pug", {
            title: "Edit My Account",
        });
    }

    async EditMyAccount(req, res) {
        // Get id from params
        const id = res.locals.account._id;

        // Get data account from form
        const dataAccount = req.body;

        // Check another account has email
        const anotherAccount = await Account.findOne({ email: dataAccount.email });

        // Check another account is exist
        if (anotherAccount && anotherAccount._id.toString() != id.toString()) {
            console.log("Email is exist");
        } else {
            // Check image is exist
            if (req.files["avatar"]) {
                dataAccount.avatar = `http://localhost:3000/uploads/${req.files["avatar"][0].filename}`;
            }

            // Hash password
            if (dataAccount.password) dataAccount.password = md5(dataAccount.password);

            // Find and update account
            await Account.findByIdAndUpdate({ _id: id }, dataAccount);
        }

        // Redirect to page account
        res.redirect("back");
    }
}

module.exports = new myAccountController();
