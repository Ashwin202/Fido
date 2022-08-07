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
router.get("/login",(req, res) => {
  if(req.user){
    con.query(query.getAllDetails(req.user.empid), (error, resul) => {
      return res.status(200).render("../views/dashboard.ejs", { userData: resul })
    })
  }
  else{
  return res.render("index");}
});
router.post("/login", passport.authenticate('local', { failureRedirect: '/altFailure', failureFlash: true }), (req, res) => {
  console.log("first")
  console.log(req.body)
  sessionData=req.session
  sessionData.user={}
  sessionData.user.userType=req.body.userType
  return res.sendStatus(200)
});
router.get('/userDetails', ensureAuthenticated, (req, res) => {
  return res.status(200).json(req.user)
})
router.get('/altFailure', (req, res) => {
  res.status(401).json({ error: req.flash('error')[0] })
})
router.get("/dashboard",ensureAuthenticated, (req, res) => {
  con.query(query.getAllDetails(req.user.empid), (error, resul) => {
    console.log(sessionData.user.userType)
    if(sessionData.user.userType=='guest'){
    return res.status(200).render("../views/dashboard.ejs", { userData: resul })
  }
  else{
    return res.status(200).render("../views/dashboard-mentor.ejs", { userData: resul })
  }
  })
})
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).redirect("/public");
  });
})
module.exports = router;
