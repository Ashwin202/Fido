const router = require("express").Router()
const multer = require('multer')
const upload = multer()
const { getMenteeDetails, getMentorDetails, addMentees, addMentors, getAllUserDetails } = require('./controller')

router.get('/', (request, response) => {
    const userType = request.query.userType || request.body.userType 
    if (userType === 'mentee') 
      getMenteeDetails(request, response);
    else if (userType === 'mentor') 
      getMentorDetails(request, response);
    else
      getAllUserDetails(request, response);
    
  })
  
  router.post('/',upload.single('bulk-upload-sheet'), (request, response) => {
    const userType = request.query.userType || request.body.userType 
    userType === 'mentee' ? addMentees(request, response) : addMentors(request, response)
  })
  

module.exports = router