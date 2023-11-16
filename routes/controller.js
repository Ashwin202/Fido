const { getDomain, updateDomain, deleteDomain, addDomain, addForm, getForm, updateForm, deleteForm, addGroup, allMentors, getDomainList, addTeam, getTeam, updateTeam, deleteTeam, getGroup, updateGroup, deleteGroup } = require("../database/query")
const runQuery = require("../database/runQuery")
const sendHTTPResponse = require("../lib/sendHTTPResponse")

// Domain Controller
const getDomainController = async (request, response) => {
   const domainID = request.query.id
   const domainValue = (await runQuery(getDomain(), domainID))[0]
   return sendHTTPResponse.success(response, "Fetched domain corresponding to the id", domainValue)
}

const updateDomainController = async (request, response) => {
   const domain = request.body.domain
   const domainID = request.params.id
   await runQuery(updateDomain(), [domain, domainID])
   return sendHTTPResponse.success(response, "Update Domain Successfully")
}

const deleteDomainController = async (request, response) => {
   const domainID = request.params.id
   await runQuery(deleteDomain(), [domainID])
   return sendHTTPResponse.success(response, "Deleted Domain Successfully")
}

const addDomainController = async (request, response) => {
   const domain = request.body.domain
   const userID = request.userID
   await runQuery(addDomain(), [domain, userID])
   return sendHTTPResponse.success(response, "Added Domain Successfully")
}

// Form Controller
const getFormController = async (request, response) => {
   const formID = request.params.id
   const formDetails = (await runQuery(getForm(), [formID]))[0]
   return sendHTTPResponse.success(response, "Fetched domain corresponding to the id", formDetails)
}

const addFormController = async (request, response) => {
   const formData = request.body.formData
   const userID = request.userID
   await runQuery(addForm(), [formData.name, formData.value, userID])
   return sendHTTPResponse.success(response, "Added Domain Successfully")
}

const updateFormController = async (request, response) => {
   const formID = request.params.id
   const formDetails = request.body
   await runQuery(updateForm(), [formDetails.name, formDetails.value, request.userID, formID])
   return sendHTTPResponse.success(response, "Update Domain Successfully")
}

const deleteFormController = async (request, response) => {
   const domainID = request.params.id
   await runQuery(deleteForm(), [domainID])
   return sendHTTPResponse.success(response, "Deleted Form Successfully")
}

// Groups
const addGroupController = async (request, response) => {
   const isDomainSpecificGropuing = request.query?.hasDomainGroup
   if (isDomainSpecificGropuing != 'false') {
      const allMentorsList = await runQuery(allMentors())
      const allDomains = await runQuery(getDomainList())
      const groupArray = allDomains?.map((domain) => {
         const groupName = `${domain.value} Group`
         const mentorList = allMentorsList.filter((mentor) => mentor.domain === domain.id).map((mentor) => mentor.id)
         return { groupName, mentorList }
      })
      groupArray.map(async (group) => {
         const { groupName, mentorList } = group
         await runQuery(addGroup(), [groupName, JSON.stringify(mentorList), request.userID])
      })
         return sendHTTPResponse.success(response, "Added Group Successfully")
   }
   const checkedAgentIDList = request.body.checkedAgentIDList
   const groupName = request.body.groupName
   await runQuery(addGroup(), [groupName, JSON.stringify(checkedAgentIDList), request.userID])
   return sendHTTPResponse.success(response, "Added Group Successfully")
}
const getGroupController = async (request, response) => {
   const groupID = request.query.id
   const groupValue = (await runQuery(getGroup(), groupID))[0]
   return sendHTTPResponse.success(response, "Fetched group corresponding to the id", groupValue)
}
const updateGroupController = async (request, response) => {
   const groupID = request.params.id
   const groupName = request.body.groupName
   const groupList = request.body.checkedUserIDListOnEdit
   await runQuery(updateGroup(), [groupName, JSON.stringify(groupList), request.userID, groupID])
   return sendHTTPResponse.success(response, "Update Team Successfully")
}
const deleteGroupController = async (request, response) => {
   const groupID = request.params.id
   await runQuery(deleteGroup(), [groupID])
   return sendHTTPResponse.success(response, "Deleted Group Successfully")
}
// Team
const addTeamController = async (request, response) => {
   const checkedTeamIDList = request.body.checkedUserIDList
   const teamName = request.body.teamName
   await runQuery(addTeam(), [teamName, JSON.stringify(checkedTeamIDList), request.userID])
   return sendHTTPResponse.success(response, "Added Team Successfully")
}
const getTeamController = async (request, response) => {
   const teamID = request.query.id
   const teamValue = (await runQuery(getTeam(), teamID))[0]
   return sendHTTPResponse.success(response, "Fetched team corresponding to the id", teamValue)
}
const updateTeamController = async (request, response) => {
   const teamID = request.params.id
   const teamName = request.body.teamName
   const teamList = request.body.checkedUserIDListOnEdit
   await runQuery(updateTeam(), [teamName, JSON.stringify(teamList), request.userID, teamID])
   return sendHTTPResponse.success(response, "Update Team Successfully")
}
const deleteTeamController = async (request, response) => {
   const teamID = request.params.id
   await runQuery(deleteTeam(), [teamID])
   return sendHTTPResponse.success(response, "Deleted Team Successfully")
}
module.exports = {
   getDomainController,
   updateDomainController,
   deleteDomainController,
   addDomainController,
   getFormController,
   addFormController,
   updateFormController,
   deleteFormController,
   addGroupController,
   addTeamController,
   getTeamController,
   updateTeamController,
   deleteTeamController,
   getGroupController,
   updateGroupController,
   deleteGroupController
}
