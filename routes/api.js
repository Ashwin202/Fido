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
    else{
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
  if (sessionData.user.userType == 'guest') {
    con.query(query.getAllDetailsGuest(req.user.empid), (error, result) => {
      return res.status(200).render("../views/dashboard.ejs", { userData: result })
    })
  }
  else {
    con.query(query.getAllDetails(req.user.empid), (error, result) => {
      return res.status(200).render("../views/dashboard-mentor.ejs", { userData: result })
    })
  }
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
