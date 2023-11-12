const router = require("express").Router()
const { getMenteeDetails, getMentorDetails, addMentees, addMentors } = require('./controller')

router.get('/', (request, response) => {
    const userType = request.query.userType || request.body.userType 
    userType === 'mentee' ? getMenteeDetails(request, response) : getMentorDetails(request, response)
  })
  
  router.post('/', (request, response) => {
    const userType = request.query.userType || request.body.userType 
    userType === 'mentee' ? addMentees(request, response) : addMentors(request, response)
  })
  

module.exports = router