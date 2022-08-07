var express = require("express");
var mysql = require("mysql");
const app = express();
const flash=require("connect-flash")
var session = require("express-session");
const passport = require('passport');
var router = require("./routes/api");
const auth=require("./routes/functions/auth")
require("dotenv").config();

var con = require("./database/db");
const bodyParser = require("body-parser");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
      secure: false
  }
}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(flash());
app.use(passport.initialize())
app.use(passport.session());
app.use(express.urlencoded({extended: true}))
app.use(express.json())

con.connect((err) => {
  if (err) {
    console.log("Error in connecting the server with  userlogin table");
  } else {     
    auth.setStrategies(app);
    console.log("Database connected to userlogin database");
  }
});

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
