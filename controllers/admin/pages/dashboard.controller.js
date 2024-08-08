// Class to handdle dashboard - Admin
class dashBoardController {
    // Get Products Page
    getDashboard(req, res) {
        const products = res.render("admin/pages/dashboard/index.pug", {
            title: "Dashboard",
            layout: "admin/layouts/layout",
        });
    }
}

module.exports = new dashBoardController();
