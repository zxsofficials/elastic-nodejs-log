// const http = require('http')
// const winston = require('winston')
// const ecsFormat = require('@elastic/ecs-winston-format')

import http from 'http';
import winston from 'winston'
import ecsFormat from "@elastic/ecs-winston-format";

const logger = winston.createLogger({
    level: 'debug',
    format: ecsFormat({ convertReqRes: true }),
    transports: [
        //new winston.transports.Console(),
        new winston.transports.File({
            //path to log file
            filename: 'logs/log.json',
            level: 'debug'
        })
    ]
})

const server = http.createServer(handler)
server.listen(3000, () => {
    console.log(`'listening at http://localhost:3000'`)
    logger.info('listening at http://localhost:3000')
})

function handler (req, res) {
    res.setHeader('Foo', 'Bar')
    res.end('ok')
    logger.info('handled request', { req, res })
}
