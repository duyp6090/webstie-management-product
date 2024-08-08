// Connect to database
const mongoose = require("mongoose");

class Database {
    async connect() {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("Connect to database successfully");
        } catch (error) {
            console.log("Connect to database failed");
        }
    }
}

module.exports = new Database();
