const runQuery = require("../../database/runQuery")
const sendHTTPResponse = require("../../lib/sendHTTPResponse")
const { getMentors, addMentor } = require("./query")

const getMentorDetails = async(request, response)=>{
    const mentorList = (await runQuery(getMentors()))
    return sendHTTPResponse.success(response, "Fetched mentors data.", mentorList)
}
const addMentors = async(request, response)=>{
    const {fname, lname, email, domain} = request.body
    await runQuery(addMentor(), [email, fname, lname, domain])
    return sendHTTPResponse.success(response, "Added mentor data.")
}

module.exports ={
    getMentorDetails,
    addMentors
}