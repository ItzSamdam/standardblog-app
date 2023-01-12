const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middleware/logging/logger');
const limiter = require('./middleware/rateLimit')
const helmet = require('helmet')
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute")
const CONFIG = require('./config/config');
const connectToDB = require("./database/dbConfig");
const cors = require('cors')


connectToDB()
require("./middleware/authentication")

const app = express()
//security
app.use(helmet())

app.use(cors())
app.use(limiter)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use('/api', userRoute)
app.use('/api/blog', blogRoute)


app.get('/', (req, res) => {
    res.status(200).json({status: true, message: "Welcome to Standard Blog"})
});

// Error handler middleware
app.use((error, req, res, next) => {
    console.error(error)
    const errorStatus = error.status || 500
    res.status(errorStatus).json({status: false, message: error.message})
    next()
})

app.listen(CONFIG.PORT, () => {
    logger.info(`Server is listening on port ${CONFIG.PORT}`)
});
