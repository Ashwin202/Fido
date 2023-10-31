const { getDomain, updateDomain, deleteDomain, addDomain, addForm, getForm, updateForm, deleteForm, addGroup, allMentors, getDomainList } = require("../database/query")
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
   await runQuery(addDomain(), [domain, 3])
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
   await runQuery(addForm(), [formData.name, formData.value, 3])
   return sendHTTPResponse.success(response, "Added Domain Successfully")
}

const updateFormController = async (request, response) => {
   const formID = request.params.id
   const formDetails = request.body
   await runQuery(updateForm(), [formDetails.name, formDetails.value, 3, formID])
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
         await runQuery(addGroup(), [groupName, JSON.stringify(mentorList), 3])
      })
         return sendHTTPResponse.success(response, "Added Group Successfully")
   }
   const checkedAgentIDList = request.body.checkedAgentIDList
   const groupName = request.body.groupName
   await runQuery(addGroup(), [groupName, JSON.stringify(checkedAgentIDList), 3])
   return sendHTTPResponse.success(response, "Added Group Successfully")
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
}
