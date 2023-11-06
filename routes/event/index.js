const router = require('express').Router()
const { addEventController, getEventDetails  } = require('./controller')

router.get('/',getEventDetails)
router.post('/',addEventController)

module.exports = router
