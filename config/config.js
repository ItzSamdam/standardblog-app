// Config.js
require('dotenv').config();

module.exports = {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    EXPIRE_TIME: process.env.EXPIRE_TIME,
}
