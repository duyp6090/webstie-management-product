// Import account model
const Account = require("../../../model/account.model.js");

// Import role model
const Role = require("../../../model/role.model.js");

// Md5
const md5 = require("md5");

// Import fillterStatus
const fillterStatusHelper = require("../../../helper/fillterStatus.js");

// Import pagination
const paginationHelper = require("../../../helper/pagination.js");

// Import search
const searchHelper = require("../../../helper/search.js");

// Class to handle account controller
class accountsController {
    // [GET] page acount
    async getPageAccount(req, res) {
        // Fillter button status
        const fillterStatus = fillterStatusHelper(req.query);

        // Find condition
        let find = {
            deleted: false,
        };

        // Status find
        if (req.query.status) {
            find.status = req.query.status;
        }

        // Search Helper
        const objectSeacrh = searchHelper(req.query);

        // Search regex
        let searchFind = objectSeacrh.regex;

        if (searchFind) {
            find["fullName"] = searchFind;
        }

        // Pagination

        // Total account
        const totalAccount = await Account.countDocuments(find);

        // object - pagination
        let objectPagination = paginationHelper(
            {
                limit: 4,
                currentPage: 1,
            },
            req.query,
            totalAccount
        );

        // Count all account deleted
        const totalAccountDeleted = await Account.countDocuments({ deleted: true });

        // Get all account
        const accounts = await Account.find(find)
            .select("-password -token")
            .limit(objectPagination.limit)
            .skip(objectPagination.skip);

        res.render("admin/pages/accounts/index.pug", {
            title: "Danh sách tài khoản",
            pageCurrent: "accounts",
            accounts: accounts,
            fillterStatus: fillterStatus,
            searchFind: objectSeacrh.keyword,
            totalAccountDeleted: totalAccountDeleted,
            paginations: objectPagination,
        });
    }

    // [GET] page create account
    async getPageCreateAccount(req, res) {
        // Get all role
        const roles = await Role.find({ deleted: false });

        res.render("admin/pages/accounts/create.pug", {
            title: "Tạo tài khoản",
            roles: roles,
        });
    }

    // [POST] create account
    async postCreateAccount(req, res) {
        // Get data account from form
        const dataAccount = req.body;

        // Check if email is exist
        const account = await Account.findOne({ email: dataAccount.email });

        // If email is not exist
        if (!account) {
            // Check image is exist
            if (req.files["avatar"]) {
                dataAccount.avatar = `http://localhost:3000/uploads/${req.files["avatar"][0].filename}`;
            }

            // Hash password
            dataAccount.password = md5(dataAccount.password);

            // Create new account
            const newAccount = new Account({
                fullName: dataAccount.fullName,
                email: dataAccount.email,
                password: dataAccount.password,
                phone: dataAccount.phone,
                roleId: dataAccount.roleId,
                status: dataAccount.status,
                avatar: dataAccount.avatar,
            });
            await newAccount.save();
        }
        // Redirect to page account
        res.redirect("/admin/accounts");
    }

    // [PATCH] change status account
    async changeStatusAccount(req, res) {
        // Get id and status from params
        const id = req.params.id;
        const status = req.params.status;

        // Find and update status account
        await Account.findByIdAndUpdate({ _id: id }, { status: status });

        // Redirect to page account
        res.redirect("back");
    }

    // [PATCH] change multi status account
    async changeMultiStatusAccount(req, res) {
        // Get ids and status from body
        const ids = req.body.ids.split(",");
        const typeStatus = req.body.type;

        console.log(ids, typeStatus);

        // Check type status
        if (typeStatus == "delete") {
            // Find and update status account
            await Account.updateMany({ _id: { $in: ids } }, { deleted: true });
        } else {
            // Find and update status account
            await Account.updateMany({ _id: { $in: ids } }, { status: typeStatus });
        }

        // Redirect to page account
        res.redirect("back");
    }

    // [GET] page edit account
    async getPageEditAccount(req, res) {
        // Get id from params
        const id = req.params.id;

        // Find account by id
        const account = await Account.findOne({ _id: id });

        // Get all role
        const roles = await Role.find({ deleted: false });

        res.render("admin/pages/accounts/edit.pug", {
            title: "Chỉnh sửa tài khoản",
            account: account,
            roles: roles,
        });
    }

    // [PATCH] edit account
    async editAccount(req, res) {
        // Get id from params
        const id = req.params.id;

        // Get data account from form
        const dataAccount = req.body;

        // Check another account has email
        const anotherAccount = await Account.findOne({ email: dataAccount.email });

        // Check another account is exist
        if (anotherAccount._id == id) {
            // Check image is exist
            if (req.files["avatar"]) {
                dataAccount.avatar = `http://localhost:3000/uploads/${req.files["avatar"][0].filename}`;
            }

            // Hash password
            dataAccount.password = md5(dataAccount.password);

            // Find and update account
            await Account.findByIdAndUpdate(
                { _id: id },
                {
                    fullName: dataAccount.fullName,
                    email: dataAccount.email,
                    password: dataAccount.password,
                    phone: dataAccount.phone,
                    roleId: dataAccount.roleId,
                    status: dataAccount.status,
                    avatar: dataAccount.avatar,
                }
            );
        }

        // Redirect to page account
        res.redirect("back");
    }

    // [GET] page detail account
    async getPageDetailAccount(req, res) {
        // Get id from params
        const id = req.params.id;

        // Find account by id
        const account = await Account.findOne({ _id: id });

        // Find role by id
        const role = await Role.findOne({ _id: account.roleId });

        res.render("admin/pages/accounts/detail.pug", {
            title: "Chi tiết tài khoản",
            account: account,
            role: role,
        });
    }

    // [DELETE] delete account temporarily
    async deleteAccountTemporarily(req, res) {
        // Get id from params
        const id = req.params.id;

        // Find and update account
        await Account.findByIdAndUpdate({ _id: id }, { deleted: true });

        // Redirect to page account
        res.redirect("back");
    }
}

module.exports = new accountsController();
