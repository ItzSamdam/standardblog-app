//rateLimit.js
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 20 * 60 * 60, // 20 minutes
    max: 50, //Limit each IP to 50 request per window (per 20 minutes)
    standardHeaders: true, //Return rate limit info in the RateLimit-* headers
    legacyHeaders: false // Disable the X-RateLimit-* headers
})

module.exports = limiter
