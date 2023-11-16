const jwt = require('jsonwebtoken')


const verifyCookies = (request, response, next)=>{
   const token = request.cookies.jwt
   request.cookie = token
   jwt.verify(token, process.env.SECRET_TOKEN,(error, decoded)=>{
      if(decoded){
         request.username = decoded.username
         request.userID = decoded.userID
         request.userType = decoded.userType
      }
      else{
         request.username = request.session.passport?.user.username
         request.userID = request.session.passport?.user.userID
         request.userType = request.session.passport?.user.userType
      }
   })
next()
}
module.exports = {verifyCookies}