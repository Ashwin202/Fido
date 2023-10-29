const getMentors = () => {
   return `SELECT * FROM user WHERE user_type=1`;
}
const addMentor = ()=>{
    return `INSERT INTO fido.user set emailID = ?, firstname = ?, lastname = ?, domain = ?, user_type = 1;`
}
module.exports = {
    getMentors,
    addMentor
}
