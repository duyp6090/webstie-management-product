// Import model role
const Role = require("../../../model/role.model.js");

// Import search
const searchHelper = require("../../../helper/search.js");

// Import pagination
const paginationHelper = require("../../../helper/pagination.js");

// Class to handle roles
class roleAdminController {
    // [GET] - Role's main page
    async getRole(req, res) {
        // Find condition
        let find = {
            deleted: false,
        };

        // Search
        let objectSearch = searchHelper(req.query);

        // Search find
        let searchFind = objectSearch.regex;

        if (searchFind) {
            find["title"] = searchFind;
        }

        // Get deleted roles
        const deletedRoles = await Role.find({ deleted: true });

        // Pagination

        // Count all roles
        const totalRoles = await Role.countDocuments(find);

        // Object pagination
        let objectPagination = paginationHelper(
            {
                currentPage: 1,
                limit: 4,
            },
            req.query,
            totalRoles
        );

        // Get roles
        const roles = await Role.find(find)
            .limit(objectPagination.limit)
            .skip(objectPagination.skip);

        res.render("admin/pages/role/index.pug", {
            title: "Role",
            roles: roles,
            pageCurrent: "roles",
            searchFind: objectSearch.keyword,
            deletedRoles: deletedRoles,
            paginations: objectPagination,
        });
    }

    // [GET] - Create role's page
    async getPageCreateRole(req, res) {
        res.render("admin/pages/role/create.pug", {
            title: "Create Role",
        });
    }

    // [POST] - Create role
    async createRole(req, res) {
        // Get role data from form
        const newRole = req.body;

        // Create role
        const role = new Role({
            title: newRole.title,
            description: newRole.desc,
        });

        // Save role
        await role.save();

        // Redirect
        res.redirect("/admin/roles");
    }

    // [GET] - Edit role's page
    async getEditRole(req, res) {
        // Get role id
        const id = req.params.id;

        // Find role
        const role = await Role.findById(id);

        res.render("admin/pages/role/edit.pug", {
            title: "Edit Role",
            role: role,
        });
    }

    // [PATCH] - Edit role
    async editRole(req, res) {
        // Get role data from form
        const newRole = req.body;

        // Get role id
        const id = req.params.id;

        // Find by id and update
        await Role.findByIdAndUpdate(
            { _id: id },
            {
                title: newRole.title,
                description: newRole.desc,
            }
        );

        // Redirect
        res.redirect("back");
    }

    // [DELETE] - Delete role temporarily
    async deleteRoleTemporarily(req, res) {
        // Get role id
        const id = req.params.id;

        // Find by id and update
        await Role.findByIdAndUpdate(
            { _id: id },
            {
                deleted: true,
            }
        );

        // Redirect
        res.redirect("back");
    }

    // [GET] - Detail role's page
    async getDetailRole(req, res) {
        // Get role id
        const id = req.params.id;

        // Find role by id
        const role = await Role.findById(id);

        res.render("admin/pages/role/detail.pug", {
            title: "Detail Role",
            role: role,
        });
    }

    // [GET] - Authorization role's page
    async getAuthorizationRole(req, res) {
        // Get all role
        const roles = await Role.find({ deleted: false });

        // Object to store authorization for each role
        let arrAuthorization = [
            {
                nameAutorization: "category",
                typeAuthorizations: ["view", "create", "edit", "delete"],
            },
            {
                nameAutorization: "product",
                typeAuthorizations: ["view", "create", "edit", "delete"],
            },
            {
                nameAutorization: "groupRole",
                typeAuthorizations: ["view", "create", "edit", "delete", "authorization"],
            },
        ];

        res.render("admin/pages/role/authorization.pug", {
            title: "Authorization Role",
            roles: roles,
            arrAuthorization: arrAuthorization,
        });
    }

    // [PATCH] - Update authorization role
    async updatedAuthorizationRole(req, res) {
        // Get list authorization by role
        const listAuthorizationByIdRole = JSON.parse(req.body.permissions);

        // Loop through all list authorization by role
        listAuthorizationByIdRole.forEach(async (authorization) => {
            // Get role id and permissions
            const { id, ...newPermissions } = authorization;

            // Find by id and update
            await Role.findByIdAndUpdate(
                { _id: id },
                {
                    permissions: newPermissions,
                }
            );
        });

        // Redirect
        res.redirect("back");
    }

    // [GET] - Trash role's page
    async getTrashRole(req, res) {
        // Find condition
        let find = {
            deleted: true,
        };

        // Search
        let objectSearch = searchHelper(req.query);

        // Search find
        let searchFind = objectSearch.regex;

        if (searchFind) {
            find["title"] = searchFind;
        }

        // Pagination

        // Count all roles
        const totalRoles = await Role.countDocuments(find);

        // Object pagination
        let objectPagination = paginationHelper(
            {
                currentPage: 1,
                limit: 4,
            },
            req.query,
            totalRoles
        );

        // Get roles
        const roles = await Role.find(find)
            .limit(objectPagination.limit)
            .skip(objectPagination.skip);

        res.render("admin/pages/role/trash.pug", {
            title: "Role",
            roles: roles,
            pageCurrent: "roles",
            searchFind: objectSearch.keyword,
            paginations: objectPagination,
        });
    }

    // [DELETE] - Delete role forever
    async deleteRoleForever(req, res) {
        // Get role id
        const id = req.params.id;

        // Find by id and delete
        await Role.deleteOne({ _id: id });

        // Redirect
        res.redirect("back");
    }

    // [PATCH] - Restore role
    async restoreRole(req, res) {
        // Get role id
        const id = req.params.id;

        // Find by id and update
        await Role.findByIdAndUpdate(
            { _id: id },
            {
                deleted: false,
            }
        );

        // Redirect
        res.redirect("back");
    }
}

// Export module
module.exports = new roleAdminController();
