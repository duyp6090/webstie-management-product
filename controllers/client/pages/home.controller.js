// Class to handdle Home Page - Client
class homeController {
    // Get Home Page
    getHomePage(req, res) {
        res.render("client/pages/home/index.pug");
    }
}

module.exports = new homeController();
