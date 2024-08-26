// Import model role
const Role = require("../../../model/role.model.js");

// Class to handle roles
class roleAdminController {
    // [GET] - Role's main page
    async getRole(req, res) {
        // Find condition
        let find = {
            deleted: false,
        };

        // Get roles
        const roles = await Role.find(find);

        res.render("admin/pages/role/index.pug", {
            title: "Role",
            roles: roles,
            pageCurrent: "roles",
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
}

// Export module
module.exports = new roleAdminController();
