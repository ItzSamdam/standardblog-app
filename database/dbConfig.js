//dbConfig.js
const mongoose = require('mongoose');
const CONFIG = require('../config/config');
const logger = require('../middleware/logging/logger')


function connectToDataBase() {
    mongoose.set("strictQuery", false);
    mongoose.connect(CONFIG.MONGODB_URI)

    mongoose.connection.on("connected", () => {
        logger.info('Database connected successfully')
    })

    mongoose.connection.on("error", (err) => {
        logger.info('An error occurred while trying to connect to database')
        logger.error(error)
    })
};
module.exports = connectToDataBase
