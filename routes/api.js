var express = require("express");
const app = express();
const bcrypt = require('bcrypt')
const con = require("../database/db")
const query = require("../database/query")
const session = require("express-session")
var bodyParser = require("body-parser");
var urlParser = bodyParser.urlencoded();
const flash = require("connect-flash")
var router = express.Router();
const passport = require('passport');
const { ensureAuthenticated } = require("./functions/auth");
var sessionData

router.get("/login", (req, res) => {
  if (req.user) {
    if (sessionData.user.userType != '' && sessionData.user.userType == 'guest') {
      con.query(query.getAllDetailsGuest(req.user.empid), (error, result) => {
        return res.status(200).render("../views/dashboard.ejs", { userData: result })
      })
    }
    else {
      con.query(query.getAllDetails(req.user.empid), (error, result) => {
        return res.status(200).render("../views/dashboard-mentor.ejs", { userData: result })
      })
    }
  }
  else {
    return res.render("index");
  }
});

router.post("/login", passport.authenticate('guest-local', { failureRedirect: '/altFailure', failureFlash: true }), (req, res) => {
  sessionData = req.session
  sessionData.user = {}
  sessionData.user.userType = req.body.userType
  return res.sendStatus(200)
});

router.post("/loginMentor", passport.authenticate('mentor-local', { failureRedirect: '/altFailure', failureFlash: true }), (req, res) => {
  sessionData = req.session
  sessionData.user = {}
  sessionData.user.userType = req.body.userType
  return res.sendStatus(200)
});

router.get('/userDetails', ensureAuthenticated, (req, res) => {
  return res.status(200).json(req.user)
})

router.get('/altFailure', (req, res) => {
  res.status(401).json({ error: req.flash('error')[0] })
})

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  con.query(query.getAllDetails(req.user.empid), (error, result) => {
    return res.status(200).render("../views/dashboard-mentor.ejs", { usertype: sessionData.user.userType, userData: result })
  })
})
router.get("/feedback", ensureAuthenticated, (req, res) => {
  return res.status(200).render("../views/feedback.ejs")
})
router.post("/feedback", (req, res) => {
  let mentorname = req.body.mentorname
  let mentorid = req.body.mentorid
  let menteename = req.body.menteename
  let menteeid = req.body.menteeid
  let punctuality = req.body.punctuality
  let dedication = req.body.dedication
  let behaviour = req.body.behaviour
  let work = req.body.work
  let study = req.body.study
  let question = req.body.question
  let advice = req.body.advice
  let listen = req.body.listen

  // con.query(query.)
})
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).redirect("/login");
  });
})
module.exports = router;
