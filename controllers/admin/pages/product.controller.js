// Import model
const Product = require("../../../model/product.model.js");

// Import categories model
const Categories = require("../../../model/categories.model.js");

// Import account model
const Account = require("../../../model/account.model.js");

// Import fillterStatus
const fillterStatusHelper = require("../../../helper/fillterStatus.js");

// Import search
const searchHelper = require("../../../helper/search.js");

// Import pagination
const paginationHelper = require("../../../helper/pagination.js");

// Import sortHelper
const sortHelper = require("../../../helper/sort.js");

// Import findParentByIdHelper
const findParentByIdHelper = require("../../../helper/findParentId.js");

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

        // Search regex
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

        // Object seacrh
        let sort = sortHelper(req.query);

        // Get type sort and value sort
        const sortParams = req.query.sort;

        // Get Products
        const products = await Product.find(find)
            .sort(sort)
            .limit(objectPagination.limit)
            .skip(objectPagination.skip);

        // Loop through products to get full name of account
        for (let i = 0; i < products.length; i++) {
            // Get category by id
            const account = await Account.findOne({ _id: products[i].createBy.account_id });

            // Assign category to product
            if (account) {
                products[i].accountFullName = account.fullName;
            }
        }

        res.render("admin/pages/product/index.pug", {
            title: "Products",
            pageCurrent: "products",
            products: products,
            fillterStatus: fillterStatus,
            searchFind: objectSeacrh.keyword,
            paginations: objectPagination,
            totalProductsDeleted: totalProductsDeleted,
            typeSort: sortParams,
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
            {
                availabilityStatus: statusProducts == "active" ? "Stock" : "No Stock",
                updateBy: {
                    account_id: res.locals.account._id,
                    updatedAt: Date.now(),
                },
            }
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
                optionUpdate.updateBy = {
                    account_id: res.locals.account._id,
                    updatedAt: Date.now(),
                };
                break;
            case "inactive":
                optionUpdate.availabilityStatus = "No Stock";
                optionUpdate.updateBy = {
                    account_id: res.locals.account._id,
                    updatedAt: Date.now(),
                };
                break;
            case "delete":
                optionUpdate.deleted = true;
                optionUpdate.deleteBy = {
                    account_id: res.locals.account._id,
                    deletedAt: Date.now(),
                };
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
        await Product.updateOne(
            { _id: id },
            {
                deleted: true,
                deleteBy: {
                    account_id: res.locals.account._id,
                    deletedAt: Date.now(),
                },
            }
        );

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

        // Object seacrh
        let sort = sortHelper(req.query);

        // Get type sort and value sort
        const sortParams = req.query.sort;

        // Get Products
        const products = await Product.find(find)
            .sort(sort)
            .limit(objectPagination.limit)
            .skip(objectPagination.skip);

        // Loop through products to get full name of account
        for (let i = 0; i < products.length; i++) {
            // Get category by id
            const account = await Account.findOne({ _id: products[i].deleteBy.account_id });

            // Assign category to product
            if (account) {
                products[i].accountFullName = account.fullName;
            }
        }

        res.render("admin/pages/product/trash-product.pug", {
            title: "Products",
            products: products,
            fillterStatus: fillterStatus,
            searchFind: objectSeacrh.keyword,
            paginations: objectPagination,
            typeSort: sortParams,
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

    // [GET] Get information products
    async getProductEdit(req, res) {
        // Get id from params
        const id = req.params.id;

        // Get document in database
        const product = await Product.findOne({ _id: id });

        // Get list categories
        const categories = await Categories.find({
            deleted: false,
        });

        // Get parent categories
        const arrParentCategories = findParentByIdHelper(categories);

        // Render view
        res.render("admin/pages/product/edit-product.pug", {
            title: "Chỉnh sửa sản phẩm",
            product: product,
            arrParentCategories: arrParentCategories,
        });
    }

    // [PATCH] Update product
    async updateProduct(req, res) {
        // Get id from params
        const id = req.params.id;

        // Get data from body
        const dataProduct = req.body;

        // Assign updated by account
        dataProduct.updateBy = {
            account_id: res.locals.account._id,
            updatedAt: Date.now(),
        };

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

        //  Assign thumbnail
        if (req.files["thumbnails"]) {
            dataProduct.thumbnails = `http://localhost:3000/uploads/${req.files["thumbnails"][0].filename}`;
        }

        // Assign images
        if (req.files["images"]) {
            dataProduct.images = `http://localhost:3000/uploads/${req.files["images"][0].filename}`;
        }

        // Updated product
        try {
            await Product.updateOne(
                {
                    _id: id,
                },
                {
                    title: dataProduct.title,
                    description: dataProduct.desc,
                    category_id: dataProduct.category_id,
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
                    images: dataProduct.images,
                    thumbnail: dataProduct.thumbnails,
                    updateBy: dataProduct.updateBy,
                    featured: dataProduct.featured,
                }
            );
        } catch (error) {
            console.log(error);
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
    async createProduct(req, res) {
        // Get list categories
        const categories = await Categories.find({
            deleted: false,
        });

        // Get parent categories
        const arrParentCategories = findParentByIdHelper(categories);

        res.render("admin/pages/product/create-product.pug", {
            title: "Create Product",
            arrParentCategories: arrParentCategories,
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

        //  Assign thumbnail
        if (req.files["thumbnails"]) {
            dataProduct.thumbnails = `http://localhost:3000/uploads/${req.files["thumbnails"][0].filename}`;
        }

        // Assign images
        if (req.files["images"]) {
            dataProduct.images = `http://localhost:3000/uploads/${req.files["images"][0].filename}`;
        }

        // Get account create by user
        dataProduct.createBy = {
            account_id: res.locals.account._id,
        };

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
            images: dataProduct.images,
            thumbnail: dataProduct.thumbnails,
            createBy: dataProduct.createBy,
            featured: dataProduct.featured,
        });

        // Save product
        await product.save();

        // Redirect
        res.redirect("/admin/products");
    }

    // [GET] Get information products
    async detailProduct(req, res) {
        // Get id from params
        const id = req.params.id;

        // Get document in database
        const product = await Product.findOne({ _id: id });

        res.render("admin/pages/product/detail-product.pug", {
            title: "Chi tiết sản phẩm",
            product: product,
        });
    }
}

module.exports = new productAdminController();
