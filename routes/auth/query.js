const getUserDetails = ()=>{
    return `SELECT * FROM fido.user where username= ?; `
}

module.exports = {getUserDetails}