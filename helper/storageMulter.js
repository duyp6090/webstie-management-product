// Import multer
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
        const uniquepreffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");
        cb(null, uniquepreffix + "-" + file.originalname);
    },
});

module.exports = storage;
