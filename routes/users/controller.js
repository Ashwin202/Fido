const bcrypt = require("bcrypt")
const runQuery = require("../../database/runQuery")
const sendHTTPResponse = require("../../lib/sendHTTPResponse")
const { addMentee, getMentee, getMentors, addMentor } = require("./query")

const getMenteeDetails = async (request, response) => {
   const mentorList = await runQuery(getMentee())
   return sendHTTPResponse.success(response, "Fetched mentees data.", mentorList)
}
const addMentees = async (request, response) => {
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
   addMentors
}
