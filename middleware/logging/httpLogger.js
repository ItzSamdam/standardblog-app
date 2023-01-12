//httpLogger.js
const logger = require('./logger')
const morgan = require('morgan')
const { json } = require('express')

const format = json({
    method: ':method',
    url: ':url',
    contentLength: 'res[content-length]',
    responseTime: ':response-time'
})

const httpLogger = morgan(format, {
    stream: {
        write: (message) => {
            const {
                method,
                url,
                status,
                contentLength,
                responseTime
            } = JSON.parse(message)

            logger.info('HTTP Access Log', {
                timestamp: new Date().toString(),
                method,
                url,
                status: Number(status),
                contentLength,
                responseTime: Number(responseTime)
            })
        }
    }
})

module.exports = httpLogger
