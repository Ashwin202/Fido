var express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const con = require("../database/db");
const query = require("../database/query");
// const session = require("express-session");
var bodyParser = require("body-parser");
// var urlParser = bodyParser.urlencoded();
const flash = require("connect-flash");
var router = express.Router();
const passport = require("passport");
const runQuery = require("../database/runQuery");
// const  } = require("./functions/auth");
var sessionData;

router.get("/login", (req, res) => {
   if (req.user) {
      if (sessionData.user.userType != "" && sessionData.user.userType == "guest") {
         con.query(query.getAllDetailsGuest(req.user.empid), (error, result) => {
            return res.status(200).render("../views/dashboard-mentor.ejs", { usertype: sessionData.user.userType, userData: result });
         });
      } else {
         con.query(query.getAllDetails(req.user.empid), (error, result) => {
            return res.status(200).render("../views/dashboard-mentor.ejs", { usertype: sessionData.user.userType, userData: result });
         });
      }
   } else {
      return res.render("index");
   }
});

router.post("/login", (req, res) => {
  console.log(req.body)
   sessionData = req.session;
   sessionData.user = {};
   sessionData.user.userType = req.body.userType;
   return res.sendStatus(200);
});

router.post("/loginMentor", (req, res) => {
   sessionData = req.session;
   sessionData.user = {};
   sessionData.user.userType = req.body.userType;
   return res.sendStatus(200);
});

router.get("/userDetails", (req, res) => {
   return res.status(200).json(req.user);
});

router.get("/altFailure", (req, res) => {
   res.status(401).json({ error: req.flash("error")[0] });
});

router.get("/register", (req, res) => {
   return res.status(200).render("../views/register.ejs");
});

router.post("/register", (req, respo) => {
   let name = req.body.name;
   let userType = req.body.userType;
   let id = req.body.id;
   let domain = req.body.domain;
   let username = req.body.username;
   let password = req.body.password;
   let hash = bcrypt.hashSync(password, 10);
   con.query(query.register(id, username, hash, userType), (err, res) => {
      if (err) {
         console.log(err.message);
         respo.status(400).json({ error: req.flash("error")[0] });
      } else {
         console.log("Register Successfull");
         respo.status(200).json({
            error: false,
            message: "Resgistration added",
            data: {},
         });
         return;
      }
   });
});

router.get("/admin-dashboard", async(req, res) => {
const domainList = await runQuery(query.getDomainList())
// console.log(domainList)
  result=[
    {
      "empid": "E001",
      "name": "John Doe",
      "mentorname": "Jane Smith",
      "mentorid": "M001",
      "domain": "Software Development",
      "feedback": "John has shown great progress in his coding skills and has been a valuable asset to the team."
    },
    {
      "empid": "E002",
      "name": "Jane Smith",
      "mentorname": "Bob Johnson",
      "mentorid": "M002",
      "domain": "Data Analysis",
      "feedback": "Jane has a keen eye for data patterns and has consistently delivered high-quality reports."
    },
    {
      "empid": "E003",
      "name": "Alice Johnson",
      "mentorname": "Tom Brown",
      "mentorid": "M003",
      "domain": "Project Management",
      "feedback": "Alice's organizational skills have been instrumental in keeping our projects on track."
    },
    {
      "empid": "E004",
      "name": "Tom Brown",
      "mentorname": "Sara Davis",
      "mentorid": "M004",
      "domain": "Quality Assurance",
      "feedback": "Tom has a meticulous approach to testing and has caught several critical bugs before release."
    }
  ]
  return res.status(200).render("../views/layouts/dashboard-admin.ejs", { usertype: 1, userData: result, domainList });
});

router.get("/dashboard", (req, res) => {
  result=[
    {
      "empid": "E001",
      "name": "John Doe",
      "mentorname": "Jane Smith",
      "mentorid": "M001",
      "domain": "Software Development",
      "feedback": "John has shown great progress in his coding skills and has been a valuable asset to the team."
    },
    {
      "empid": "E002",
      "name": "Jane Smith",
      "mentorname": "Bob Johnson",
      "mentorid": "M002",
      "domain": "Data Analysis",
      "feedback": "Jane has a keen eye for data patterns and has consistently delivered high-quality reports."
    },
    {
      "empid": "E003",
      "name": "Alice Johnson",
      "mentorname": "Tom Brown",
      "mentorid": "M003",
      "domain": "Project Management",
      "feedback": "Alice's organizational skills have been instrumental in keeping our projects on track."
    },
    {
      "empid": "E004",
      "name": "Tom Brown",
      "mentorname": "Sara Davis",
      "mentorid": "M004",
      "domain": "Quality Assurance",
      "feedback": "Tom has a meticulous approach to testing and has caught several critical bugs before release."
    }
  ]
  return res.status(200).render("../views/dashboard-mentor.ejs", { usertype: 1, userData: result });
});

router.get("/settings", async(request, response) => {
   const domainList = await runQuery(query.getDomainList())
   const formList = await runQuery(query.getForms())
   const mentorList = await runQuery(query.allMentors())
   const groupList = await runQuery(query.allGroups())

   return response.status(200).render("../views/layouts/settings.ejs", {domainList, formList, mentorList, groupList});
});
router.get("/feedback", (req, res) => {
   return res.status(200).render("../views/feedback.ejs");
});
router.post("/feedback", (req, res) => {
   let mentorname = req.body.mentorname;
   let mentorid = req.body.mentorid;
   let menteename = req.body.menteename;
   let menteeid = req.body.menteeid;
   let domain = req.body.domain;
   let punctuality = req.body.punctuality;
   let dedication = req.body.dedication;
   let behaviour = req.body.behaviour;
   let work = req.body.work;
   let study = req.body.study;
   let question = req.body.question;
   let advice = req.body.advice;
   let listen = req.body.listen;
   let comments = req.body.comments;
   con.query(query.addFeedback(menteeid, menteename, mentorname, mentorid, domain, comments, punctuality, dedication, behaviour, work, study, question, advice, listen), (err, result) => {
      if (err) {
         console.log(err.message);
      } else {
         console.log("Feedback added");
         res.status(200).json({
            error: false,
            message: "Feedback added",
            data: {},
         });
         return;
      }
   });
});
router.get("/logout", (req, res) => {
   req.logout(function (err) {
      if (err) {
         return next(err);
      }
      res.status(200).redirect("/login");
   });
});
module.exports = router;
