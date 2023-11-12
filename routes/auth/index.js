const router = require('express').Router()
const controller = require('./controller')
  
router.post('/login',controller.loginController)
router.post('/logout',controller.logOutController)

module.exports = router