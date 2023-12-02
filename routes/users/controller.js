const bcrypt = require("bcrypt")
const runQuery = require("../../database/runQuery")
const sendHTTPResponse = require("../../lib/sendHTTPResponse")
const { addMentee, getMentee, getMentors, addMentor, getmentorsAndMentees } = require("./query")
const neatCsv = require('neat-csv')
const { bulkInsertMentees } = require("./functions")

const getMenteeDetails = async (request, response) => {
   const mentorList = await runQuery(getMentee())
   return sendHTTPResponse.success(response, "Fetched mentees data.", mentorList)
}

const getAllUserDetails = async (request, response) => {
   const mentorMenteeList = await runQuery(getmentorsAndMentees())
   return sendHTTPResponse.success(response, "Fetched mentees data.", mentorMenteeList)
}

const addMentees = async (request, response) => {
   const hasBulkData = !!request.body?.bulkData
   if(hasBulkData){
      const bulkMenteeFile = request.file.buffer.toString('utf8')
      const menteeArray = await neatCsv(bulkMenteeFile)
      await bulkInsertMentees(menteeArray);
      return sendHTTPResponse.success(response, "Added mentees data.")
   }
   const { fname, lname, email, domain, username, password } = request.body
   const hashPassword = bcrypt.hashSync(password, 10)
   await runQuery(addMentee(), [email, fname, lname, domain ?? null, username, hashPassword])
   return sendHTTPResponse.success(response, "Added mentees data.")
}

const getMentorDetails = async(request, response)=>{
    const mentorList = (await runQuery(getMentors()))
    return sendHTTPResponse.success(response, "Fetched mentors data.", mentorList)
}
const addMentors = async(request, response)=>{
    const {fname, lname, email, domain, username, password } = request.body
    const hashPassword = bcrypt.hashSync(password, 10)
    await runQuery(addMentor(), [email, fname, lname, domain, username, hashPassword])
    return sendHTTPResponse.success(response, "Added mentor data.")
}

module.exports = {
   getMenteeDetails,
   addMentees,
   getMentorDetails,
   addMentors,
   getAllUserDetails
}
