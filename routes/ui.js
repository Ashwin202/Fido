var express = require("express")
const query = require("../database/query")
var router = express.Router()
const runQuery = require("../database/runQuery")
const CONSTANTS = require("../lib/constants")


router.get('/login' ,(request, response)=>{
   if(request.userID)
      if(request.userType == CONSTANTS.USERTYPE.ADMIN)
         return response.redirect('/admin-dashboard')
      else if(request.userType == CONSTANTS.USERTYPE.MENTOR)
         return response.redirect('/mentor-dashboard')
      else
         return response.redirect('/login')
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
   const adminInsights = (await runQuery(query.getAdminInsightsCount()))[0]
   const allEvents = await runQuery(query.getAllEventList())
   const chartLabels = allEvents?.map(event => event.name)
   const chartValues = [];
   for (const event of allEvents || []) {
      const teamIDs = (JSON.parse((await runQuery(query.getTeamByID(),[event.team_id]))[0]?.user_list))
      const reviewListLength = (await runQuery(query.getReviewByIDandEventID(), [event.id, teamIDs]))?.length
      chartValues.push((reviewListLength / teamIDs?.length) *100)
   }
   chartValues.push(100) // to set the final value is 100
   return response.status(200).render("../views/layouts/dashboard-admin.ejs", { usertype: 1, domainList, username, adminInsights, chartLabels: JSON.stringify(chartLabels), chartValues:JSON.stringify(chartValues) })
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

router.get("/mentor-dashboard/:id", async (request, response) => {
   const username =request.username
   const userID = request.userID
   const eventID = request.params.id
   const eventDetails =( await runQuery(query.getEventByID(),[eventID]))[0]
   const formDetails = (await runQuery(query.getFormByID(),[eventDetails.form_id]))[0]
   const groupDetails = (await runQuery(query.getGroupByID(),[eventDetails.group_id]))[0]
   const teamDetails = (await runQuery(query.getTeamByID(),[eventDetails.team_id]))[0]
   const eventTeamDetails = await runQuery(query.getUserByID(), [JSON.parse(teamDetails.user_list)])
   const reviewDetails = await runQuery(query.getEventByEventID(), [eventID])
   let totalMatchingReviews = 0;
   eventTeamDetails?.forEach((team) => {
      const matchingReview = reviewDetails?.find((review) => team.id === review.reviewee_id);
      if (matchingReview) {
         team.isReviewed = true;
         totalMatchingReviews++;
      }
   })
   return response.status(200).render("../views/layouts/dashboard-mentor-inner.ejs", { username, eventTeamDetails, eventDetails, teamDetails, totalListCount: eventTeamDetails?.length, completedCount:totalMatchingReviews })
})

router.get("/mentor-dashboard", async (request, response) => {
   const username =request.username
   const userID = request.userID
   return response.status(200).render("../views/layouts/dashboard-mentor.ejs", { username })
})


module.exports = router