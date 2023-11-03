const runQuery = require("../../database/runQuery")
const sendHTTPResponse = require("../../lib/sendHTTPResponse")
const { getMentee, addMentee } = require("./query")

const getMenteeDetails = async(request, response)=>{
    const mentorList = (await runQuery(getMentee()))
    return sendHTTPResponse.success(response, "Fetched mentees data.", mentorList)
}
const addMentees = async(request, response)=>{
    const {fname, lname, email, domain} = request.body
    await runQuery(addMentee(), [email, fname, lname, domain??null])
    return sendHTTPResponse.success(response, "Added mentees data.")
}

module.exports ={
    getMenteeDetails,
    addMentees
}