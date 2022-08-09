module.exports = {
    getGuest(username) {
        return `SELECT password from loginTable where username = "${username}"`
    },
    getMentor(username) {
        return `SELECT password from mentorTable where name = "${username}"`
    },
    getAllDetailsGuest(empid) {
        return `select * from feedback_accucadets where empid='${empid}'`
    },
    getAllDetails() {
        return `select * from feedback_accucadets `
    },
    getLoginGuest(username) {
        return `select password,empid from login where username ="${username}"`
    },
    getLoginMentor(username) {
        return `SELECT * from  login INNER JOIN mentorTable ON login.empid=mentorTable.mentorId where username="${username}";`
    },
    getUser(empid) {
        return `select username, empid from login where empid ="${empid}"`
    },
    addFeedback(empid,name,mentorname,mentorid,domain,feedback,puntuality,dedication,behaviour,work,study,question,advice,listen){
        return `insert into feedback_accucadets( empid,name,mentorname,mentorid,domain,feedback,puntuality,dedication,behaviour,work,study,question,advice,listen)
        values("${empid}","${name}","${mentorname}","${mentorid}","${domain}","${feedback}","${puntuality}","${dedication}","${behaviour}","${work}","${study}","${question}","${advice}","${listen}")`
        
    }
}