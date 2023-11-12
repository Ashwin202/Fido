const jwt = require('jsonwebtoken')


const requestLogger = (request, response, next)=>{
    const body = request.body
    const url = request.originalUrl
    const query = request.query
    const method = request.method
    console.log(`[ ${url}] ${method} query: ${JSON.stringify(query)} | body: ${JSON.stringify(body)}`)
next()
}
module.exports = {requestLogger}