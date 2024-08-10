// Import model
const Product = require("../../../model/product.model.js");

// Class to handle product - Admin
class productAdminController {
    // Get Products Page
    async getProduct(req, res) {
        // Fillter button status
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

        // Search Find
        let searchFind = req.query.search;

        if (searchFind) {
            const regex = new RegExp(searchFind, "i");
            find["title"] = regex;
        }

        // Update Class active Fillter button
        fillterStatus.forEach((fillItem) => {
            if (fillItem.status == statusFind) {
                fillItem.class = "active";
            } else fillItem.class = "";
        });

        // Get Products
        const products = await Product.find(find);

        res.render("admin/pages/product/index.pug", {
            title: "Products",
            products: products,
            fillterStatus: fillterStatus,
            searchFind: searchFind,
        });
    }
}

module.exports = new productAdminController();
