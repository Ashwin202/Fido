const jwt = require('jsonwebtoken')
const runQuery = require('../../database/runQuery')
const query = require('./query')
const bcrypt = require("bcrypt")
const sendHTTPResponse = require('../../lib/sendHTTPResponse')

const loginController = async (request, response)=>{
    try{
        const username = request.body.username
        const password = request.body.password
        const userType = request.body.userType
        console.log({userType})
        const loginDetails = (await runQuery(query.getUserDetails(), [username, userType]))[0]
        if(!loginDetails || !bcrypt.compareSync(password, loginDetails.password))
            throw{error:404, message:"No user found!"}
        const userDetails = {username: loginDetails.username, userID: loginDetails.id}
        const accessToken = jwt.sign(userDetails, process.env.SECRET_TOKEN, {expiresIn:'1d'})
        response.cookie('jwt', accessToken, { httpOnly: true })
        return sendHTTPResponse.success(response, "Successfullly logged in.", {accessToken} )
    }
    catch(error){
        console.log(error)
        return sendHTTPResponse.success(response, "Error in logging In", error.message )
    }
  }

  const logOutController = async (request, response) => {
    try{
        response.clearCookie('jwt', { path: '/' });
        request.username = null
        request.userID = null
        request.cookies.jwt = null
        request.session.passport = null
        return sendHTTPResponse.success(response, "Logged Out Successfully" )
    }
    catch(error){
        return sendHTTPResponse.error(response, "Error in logging out", error.message )
    }
  }

  module.exports = {loginController, logOutController}