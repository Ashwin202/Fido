const CONSTANTS = require("../lib/constants");

module.exports = {

   getDomainList() {
      return `SELECT * from fido.domain where is_deleted=0;`;
   },
   getDomainByID() {
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
   getFormByID() {
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
   getUserByID(){
      return `SELECT * FROM fido.user where id IN(?);`
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
   getGroupByID() {
      return `SELECT * from fido.groups where id = ?;`;
   },
   updateGroup() {
      return `UPDATE fido.groups SET name = ?, user_list = ?, created_by = ?, active = 1  where id= ?;`;
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
   getTeamByID() {
      return `SELECT * from fido.team where id = ?;`;
   },
   updateTeam() {
      return `UPDATE fido.team SET name = ?, user_list = ?, created_by = ?, active = 1  where id= ?;`;
   },
   deleteTeam() {
      return `UPDATE fido.team SET active = 0 where id= ?;`;
   },
   getAdminInsightsCount() {
      return `SELECT
      (SELECT COUNT(*) FROM events WHERE active = 1) AS activeEvent,
      (SELECT COUNT(*) FROM user WHERE user_type = 1) AS mentorCount,
      (SELECT COUNT(*) FROM user WHERE user_type = 2) AS menteeCount;`;
   },
   getAllEventList() {
      return `SELECT * from fido.events where active=1;`;
   },
   getEventList() {
      return `SELECT * from fido.events where group_id in (?);`;
   },
   getEventByID() {
         return `SELECT * FROM fido.events where id = ?;`
   },
   getEventByEventID() {
         return `SELECT * FROM fido.review_log where event_id = ?;`
   },
   addReview() {
      return `INSERT INTO fido.review_log (reviewer_id, reviewee_id, event_id, form_id, form_response)
      VALUES (?, ?, ?, ?, ?);`;
   },
   getReviewByIDandEventID(){
      return `SELECT * FROM fido.review_log where event_id= ? and  reviewee_id in (?);`
   }
};
