const router = require('express').Router()
const { getMenteeDetails, addMentees } = require('./controller')


router.get('/',getMenteeDetails)
router.post('/',addMentees)

module.exports = router
