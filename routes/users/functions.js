const runQuery = require("../../database/runQuery")
const { addMentee } = require("./query")

const bulkInsertMentees = async (menteeArray) => {
    for (let i = 0; i < menteeArray.length; i ++) {
        const { emailID, firstname, lastname } = menteeArray[i]
        await runQuery(addMentee(), [ emailID, firstname, lastname, null, null, null])
    }
  }

  module.exports = {bulkInsertMentees}