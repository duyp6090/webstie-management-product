// Import model
const Product = require("../../../model/product.model.js");

// Import fillterStatus
const fillterStatusHelper = require("../../../helper/fillterStatus.js");

// Import search
const searchHelper = require("../../../helper/search.js");

// Import pagination
const paginationHelper = require("../../../helper/pagination.js");

// Class to handle product - Admin
class productAdminController {
    // [Get] Products page
    async getProduct(req, res) {
        // Fillter button status
        const fillterStatus = fillterStatusHelper(req.query);

        // Find condition
        let find = {
            deleted: false,
        };

        // Status find
        let statusFind = req.query.status;

        if (statusFind == "active") {
            find["availabilityStatus"] = { $ne: "No Stock" };
        } else if (statusFind == "inactive") {
            find["availabilityStatus"] = "No Stock";
        }

        // Search Helper
        const objectSeacrh = searchHelper(req.query);

        // Search Find
        let searchFind = objectSeacrh.regex;

        if (searchFind) {
            find["title"] = searchFind;
        }

        // Pagination

        // Count documents
        const totalProducts = await Product.countDocuments(find);

        // object - pagination
        let objectPagination = paginationHelper(
            {
                limit: 4,
                currentPage: 1,
            },
            req.query,
            totalProducts
        );

        // Count products deleted
        const totalProductsDeleted = await Product.countDocuments({
            deleted: true,
        });

        // Get Products
        const products = await Product.find(find)
            .sort({ "meta.createdAt": -1 })
            .limit(objectPagination.limit)
            .skip(objectPagination.skip);

        res.render("admin/pages/product/index.pug", {
            title: "Products",
            products: products,
            fillterStatus: fillterStatus,
            searchFind: objectSeacrh.keyword,
            paginations: objectPagination,
            totalProductsDeleted: totalProductsDeleted,
        });
    }

    // [PATCH] Change status product
    async changeStatus(req, res) {
        // Get id and status from params
        const idProducts = req.params.id;
        const statusProducts = req.params.status;

        // Find product by id
        await Product.updateOne(
            { _id: idProducts },
            { availabilityStatus: statusProducts == "active" ? "Stock" : "No Stock" }
        );

        // Redirect
        res.redirect("back");
    }

    // [PATCH] Change multi status products
    async changeStatusMulti(req, res) {
        const type = req.body.type;
        const ids = req.body.ids.split(",");

        // Object to update
        let optionUpdate = {};

        // Check type
        switch (type) {
            case "active":
                optionUpdate.availabilityStatus = "Stock";
                break;
            case "inactive":
                optionUpdate.availabilityStatus = "No Stock";
                break;
            case "delete":
                optionUpdate.deleted = true;
                break;
        }

        // Update multi status
        await Product.updateMany({ _id: { $in: ids } }, optionUpdate);

        // Redirect
        res.redirect("back");
    }

    // [DELETE] Delete product forever
    async deleteProduct(req, res) {
        // Get id from params
        const id = req.params.id;

        // Find product by id
        await Product.deleteOne({ _id: id });

        // Redirect
        res.redirect("back");
    }

    // [DELETE] Delete product temporarity
    async deleteProductTemporatity(req, res) {
        // Get id from params
        const id = req.params.id;

        // Find product by id
        await Product.updateOne({ _id: id }, { deleted: true });

        // Redirect
        res.redirect("back");
    }

    // [GET] Trash product
    async getTrashProduct(req, res) {
        // Fillter button status
        const fillterStatus = fillterStatusHelper(req.query);

        // Find condition
        let find = {
            deleted: true,
        };

        // Status find
        let statusFind = req.query.status;

        if (statusFind == "active") {
            find["availabilityStatus"] = { $ne: "No Stock" };
        } else if (statusFind == "inactive") {
            find["availabilityStatus"] = "No Stock";
        }

        // Search Helper
        const objectSeacrh = searchHelper(req.query);

        // Search Find
        let searchFind = objectSeacrh.regex;

        if (searchFind) {
            find["title"] = searchFind;
        }

        // Pagination

        // Count documents
        const totalProducts = await Product.countDocuments(find);

        // object - pagination
        let objectPagination = paginationHelper(
            {
                limit: 4,
                currentPage: 1,
            },
            req.query,
            totalProducts
        );

        // Get Products
        const products = await Product.find(find)
            .limit(objectPagination.limit)
            .skip(objectPagination.skip);

        res.render("admin/pages/product/trash-product.pug", {
            title: "Products",
            products: products,
            fillterStatus: fillterStatus,
            searchFind: objectSeacrh.keyword,
            paginations: objectPagination,
        });
    }

    // [PATCH] Delete - Restore multi products
    async deleteRestoreMultiProduct(req, res) {
        const type = req.body.type;
        const ids = req.body.ids.split(",");

        // Check type
        if (type == "restore") {
            await Product.updateMany({ _id: { $in: ids } }, { deleted: false });
        } else {
            await Product.deleteMany({ _id: { $in: ids } });
        }

        // Redirect
        res.redirect("back");
    }

    // [PATCH] Restore product
    async restoreProduct(req, res) {
        // Get id from params
        const id = req.params.id;

        // Find product by id
        await Product.updateOne({ _id: id }, { deleted: false });

        // Redirect
        res.redirect("back");
    }

    // [GET] Create product
    createProduct(req, res) {
        res.render("admin/pages/product/create-product.pug", {
            title: "Create Product",
        });
    }

    // [POST] Add product
    async addProduct(req, res) {
        // Get data from body
        const dataProduct = req.body;

        // Convert some data type string to number
        dataProduct.price = parseInt(dataProduct.price);
        dataProduct.discount = parseInt(dataProduct.discount);
        dataProduct.stock = parseInt(dataProduct.stock);
        dataProduct.weight = parseInt(dataProduct.weight);
        dataProduct.depth = parseInt(dataProduct.depth);
        dataProduct.width = parseInt(dataProduct.width);
        dataProduct.height = parseInt(dataProduct.height);
        dataProduct.minimumOrder = parseInt(dataProduct.minimumOrder);

        // Check availability status
        if (dataProduct.stock > 0) {
            dataProduct.availabilityStatus = "Stock";
        } else {
            dataProduct.availabilityStatus = "No Stock";
        }

        // Create new product
        const product = new Product({
            title: dataProduct.title,
            description: dataProduct.desc,
            category: dataProduct.category,
            price: dataProduct.price,
            discountPercentage: dataProduct.discount,
            stock: dataProduct.stock,
            tags: dataProduct.tags.split(","),
            brand: dataProduct.brand,
            sku: dataProduct.sku,
            weight: dataProduct.weight,
            dimensions: {
                depth: dataProduct.depth,
                width: dataProduct.width,
                height: dataProduct.height,
            },
            warrantyInformation: dataProduct.warranty,
            shippingInformation: dataProduct.inforShip,
            availabilityStatus: dataProduct.availabilityStatus,
            returnPolicy: dataProduct.returnPolicy,
            minimumOrderQuantity: dataProduct.minimumOrder,
            meta: {
                qrCode: dataProduct.qrCode,
                barCode: dataProduct.barCode,
            },
            images: dataProduct.images.split(","),
            thumbnail: dataProduct.thumbnails,
        });

        // Save product
        await product.save();

        // Redirect
        res.redirect("/admin/products");
    }
}

module.exports = new productAdminController();
