// Import mongoose
const mongoose = require("mongoose");

// Import generateStringRandom
const generateStringRandom = require("../helper/generateStringRandom.js");

// Create Schema Of Products
const accountSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        token: {
            type: String,
            default: generateStringRandom(32),
        },
        phone: {
            type: String,
            default: "",
        },
        avatar: {
            type: String,
            default: "",
        },
        roleId: {
            type: String,
        },
        status: {
            type: String,
            default: "active",
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

// Create Model Of Products
const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;
