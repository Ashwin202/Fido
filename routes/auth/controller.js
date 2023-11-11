const jwt = require('jsonwebtoken')
const runQuery = require('../../database/runQuery')
const query = require('./query')
const bcrypt = require("bcrypt")
const sendHTTPResponse = require('../../lib/sendHTTPResponse')

const loginController = async (request, response)=>{
    try{
        const username = request.body.username
        const password = request.body.password
        const loginDetails = (await runQuery(query.getUserDetails(), [username]))[0]
        if(!loginDetails || !bcrypt.compareSync(password, loginDetails.password))
            throw{error:404, message:"No user found!"}
        const userDetails = {username: loginDetails.username, userID: loginDetails.id}
        const accessToken = jwt.sign(userDetails, process.env.SECRET_TOKEN, {expiresIn:'1d'})
        response.cookie('jwt', accessToken, { httpOnly: true })
        return sendHTTPResponse.success(response, "Successfullly logged in.", {accessToken} )
    }
    catch(error){
        console.log(error)
    }
  }

  module.exports = {loginController}