const CONSTANTS = require("../lib/constants");

module.exports = {
   getGuest(username) {
      return `SELECT password from loginTable where username = "${username}"`;
   },
   getMentor(username) {
      return `SELECT password from mentorTable where name = "${username}"`;
   },
   getAllDetailsGuest(empid) {
      return `select * from feedback_accucadets where empid='${empid}'`;
   },
   getAllDetails() {
      return `select * from feedback_accucadets `;
   },
   getLoginGuest(username) {
      // return `select password,empid from login where username ="${username}"`
      return `select password,empid from login where username="${username}" and type="guest"`;
   },
   getLoginMentor(username) {
      return `select * from login where username="${username}" and type="mentor"`;
      // return `SELECT * from  login INNER JOIN mentorTable ON login.empid=mentorTable.mentorId where username="${username}";`
   },
   getUser(empid) {
      return `select username, empid from login where empid ="${empid}"`;
   },
   addFeedback(empid, name, mentorname, mentorid, domain, feedback, puntuality, dedication, behaviour, work, study, question, advice, listen) {
      return `insert into feedback_accucadets( empid,name,mentorname,mentorid,domain,feedback,puntuality,dedication,behaviour,work,study,question,advice,listen)
        values("${empid}","${name}","${mentorname}","${mentorid}","${domain}","${feedback}","${puntuality}","${dedication}","${behaviour}","${work}","${study}","${question}","${advice}","${listen}")`;
   },
   register(empid, username, password, type) {
      return `insert into login (empid,username,password,type) values("${empid}","${username}","${password}","${type}")`;
   },

   getDomainList() {
      return `SELECT * from fido.domain where is_deleted=0;`;
   },
   getDomain() {
      return `SELECT * from fido.domain where id = ?;`;
   },
   updateDomain() {
      return `UPDATE fido.domain SET value = ?  where id= ?;`;
   },
   deleteDomain() {
      return `UPDATE fido.domain SET is_deleted = 1 where id= ?;`;
   },
   addDomain() {
      return `INSERT INTO fido.domain SET value = ?, created_by=?;`;
   },
   addForm() {
      return `INSERT INTO fido.form SET name = ?, value = ?, created_by=?;`;
   },
   getForms() {
      return `SELECT * from fido.form where is_deleted=0;`;
   },
   getForm() {
      return `SELECT * from fido.form where id = ?;`;
   },
   updateForm() {
      return `UPDATE fido.form SET name = ?, value = ?, created_by = ?  where id= ?;`;
   },
   deleteForm() {
      return `UPDATE fido.form SET is_deleted = 1 where id= ?;`;
   },
   allMentors() {
      return `SELECT * from fido.user where user_type= ${CONSTANTS.USERTYPE.MENTOR};`;
   },
   allMentees() {
      return `SELECT * from fido.user where user_type= ${CONSTANTS.USERTYPE.USER};`;
   },
   allGroups() {
      return `SELECT * from fido.groups where active=1;`;
   },
   addGroup() {
      return `INSERT INTO fido.groups (name, user_list, created_by, active)
      VALUES (?, ?, ?, 1)
      ON DUPLICATE KEY UPDATE
      user_list = VALUES(user_list);`;
   },
   getGroup() {
      return `SELECT * from fido.groups where id = ?;`;
   },
   updateGroup() {
      return `UPDATE fido.groups SET name = ?, user_list = ?, created_by = ?, active = 1  where id= ?;`
   },
   deleteGroup() {
      return `UPDATE fido.groups SET active = 0 where id= ?;`;
   },
   addTeam() {
      return `INSERT INTO fido.team (name, user_list, created_by, active)
      VALUES (?, ?, ?, 1);`;
   },
   allTeams() {
      return `SELECT * from fido.team where active=1;`;
   },
   getTeam() {
      return `SELECT * from fido.team where id = ?;`;
   },
   updateTeam() {
      return `UPDATE fido.team SET name = ?, user_list = ?, created_by = ?, active = 1  where id= ?;`
   },
   deleteTeam() {
      return `UPDATE fido.team SET active = 0 where id= ?;`;
   },
   getAdminInsightsCount() {
      return `SELECT
      (SELECT COUNT(*) FROM events WHERE active = 1) AS activeEvent,
      (SELECT COUNT(*) FROM user WHERE user_type = 1) AS mentorCount,
      (SELECT COUNT(*) FROM user WHERE user_type = 2) AS menteeCount;
  `
   }
};
