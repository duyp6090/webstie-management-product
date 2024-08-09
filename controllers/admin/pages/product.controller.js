// Import model
const Product = require("../../../model/product.model.js");

// Class to handle product - Admin
class productAdminController {
    // Get Products Page
    async getProduct(req, res) {
        // Fillter
        let fillterStatus = [
            {
                name: "Tất cả",
                status: "",
                class: "active",
            },

            {
                name: "Hoạt động",
                status: "active",
                class: "",
            },

            {
                name: "Dừng hoạt động",
                status: "inactive",
                class: "",
            },
        ];

        // Find Condition
        let find = {
            deleted: false,
        };

        // Status Find
        let statusFind = req.query.status;

        if (statusFind == "active") {
            find["availabilityStatus"] = { $ne: "No Stock" };
        } else if (statusFind == "inactive") {
            find["availabilityStatus"] = "No Stock";
        } else statusFind = "";

        // Update Class active Fillter
        fillterStatus.forEach((fillItem) => {
            if (fillItem.status == statusFind) {
                fillItem.class = "active";
            } else fillItem.class = "";
        });

        // Get Products
        const products = await Product.find(find);

        console.log(products);

        res.render("admin/pages/product/index.pug", {
            title: "Products",
            products: products,
            fillterStatus: fillterStatus,
        });
    }
}

module.exports = new productAdminController();
