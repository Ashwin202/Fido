const router = require('express').Router()
const { getMentorDetails, addMentors } = require('./controller')


router.get('/',getMentorDetails)
router.post('/',addMentors)

module.exports = router
