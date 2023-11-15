const runQuery = require("../../database/runQuery")
const sendHTTPResponse = require("../../lib/sendHTTPResponse")
const { addEvent, getEvents } = require("./query")


const getEventDetails = async(request, response)=>{
    try{
        const eventList = (await runQuery(getEvents()))
        return sendHTTPResponse.success(response, "Fetched event data.", eventList)
    }
    catch(error){
        console.log(error)
        return sendHTTPResponse.error(response, "Failed to get event details")
    }
}

const addEventController = async(request, response)=>{
    try{
        const {eventName, description, teamID, groupID, formID} = request.body
        await runQuery(addEvent(), [eventName, description, formID, groupID, teamID, request.userID])
        return sendHTTPResponse.success(response, "Event Added successfully.")
    }
    catch(error){
        console.log(error)
        return sendHTTPResponse.error(response, "Failed to add event")
    }
}

module.exports = {
    addEventController,
    getEventDetails
}