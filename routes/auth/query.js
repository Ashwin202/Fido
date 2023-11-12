const getUserDetails = ()=>{
    return `SELECT * FROM fido.user where username= ? and user_type = ?; `
}

module.exports = {getUserDetails}