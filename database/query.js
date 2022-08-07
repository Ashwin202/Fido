module.exports={
    getGuest(username){
        return `SELECT password from loginTable where username = "${username}"`
    },
    getMentor(username){
        return `SELECT password from mentorTable where name = "${username}"`
    },
    getAllDetails(empid){
        return `select * from feedback_accucadets where empid='${empid}'`
    },
    getLogin(username){
        return `select password,empid from login where username ="${username}"`
    },
    getUser(empid){
        return `select username, empid from login where empid ="${empid}"`
    }
}