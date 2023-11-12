var express = require("express")
const query = require("../database/query")
var router = express.Router()
const runQuery = require("../database/runQuery")


router.get('/login' ,(request, response)=>{
   if(request.userID)
      return response.redirect('/admin-dashboard')
   response.status(200).render('../views/layouts/login.ejs')
 })

 const isAuthenticated = (request, response, next) => {
   if(!request.userID)
      return response.redirect('/login')
   next()
 }

 router.use(isAuthenticated)
 
router.get("/admin-dashboard", async(request, response) => {
   const username =request.username
   const domainList = await runQuery(query.getDomainList())
   return response.status(200).render("../views/layouts/dashboard-admin.ejs", { usertype: 1, domainList, username })
})

router.get("/settings", async(request, response) => {
   const username =request.username
   const domainList = await runQuery(query.getDomainList())
   const formList = await runQuery(query.getForms())
   const mentorList = await runQuery(query.allMentors())
   const menteeList = await runQuery(query.allMentees())
   const groupList = await runQuery(query.allGroups())
   const teamList = await runQuery(query.allTeams())
   return response.status(200).render("../views/layouts/settings.ejs", {domainList, formList, mentorList, groupList, menteeList, teamList, username})
})

router.get("/mentor-dashboard", (req, res) => {
   res.send("Mentor Dashboard")
})



module.exports = router