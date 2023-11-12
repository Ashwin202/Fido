const CONSTANTS = require("../../lib/constants");

const getMentee = () => {
   return `SELECT user.firstname as firstname,  user.lastname as lastname , user.emailID as emailID , d.value as domain FROM user user 
   left join 
   fido.domain d on d.id=user.domain WHERE user.user_type= ${CONSTANTS.USERTYPE.USER}; `;
}
const addMentee = ()=>{
    return `INSERT INTO fido.user set emailID = ?, firstname = ?, lastname = ?, domain = ?, user_type = ${CONSTANTS.USERTYPE.USER};`
}
module.exports = {
    getMentee,
    addMentee
}