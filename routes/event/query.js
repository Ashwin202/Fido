const CONSTANTS = require("../../lib/constants")

const addEvent = ()=>{
    return `INSERT INTO fido.events set name = ?, description = ?, form_id = ?, group_id = ?, team_id=?, created_by = ?;`
}
const getEvents = ()=>{
    return `SELECT * FROM fido.events WHERE active = 1;`
}
module.exports = {
    addEvent,
    getEvents
}