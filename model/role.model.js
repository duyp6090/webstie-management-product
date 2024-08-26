// Import mongoose
const mongoose = require("mongoose");

// Create Schema Of Products
const roleSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        permissions: {
            type: {},
            default: {},
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
const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
