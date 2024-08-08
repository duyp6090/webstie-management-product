// Class to handle product - Admin
class productAdminController {
    // Get Products Page
    getProduct(req, res) {
        res.render("admin/pages/product/index.pug", {
            title: "Product",
            layout: "admin/layouts/layout",
        });
    }
}

module.exports = new productAdminController();
