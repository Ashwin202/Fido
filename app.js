var express = require("express");
var mysql = require("mysql");
const app = express();
const flash=require("connect-flash")
const session = require("express-session");
const passport = require('passport');
var uiRouter = require("./routes/ui");
var apiRouter = require("./routes");
const auth=require("./routes/functions/auth")
const jwt = require('jsonwebtoken')
require("dotenv").config();
require('./routes/auth/passport')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const { verifyCookies } = require("./routes/middlewares/verifyCookies");
const {requestLogger}  = require("./routes/middlewares/requestLogger");


app.use(bodyParser.json())

app.use(cookieParser());

app.use(session({
  secret: 'processenv',
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

passport.serializeUser( (user, done) => { 
  done(null, user)
} )
passport.deserializeUser( (user, done) => { 
  done(null, user)
})

app.use(requestLogger)
app.use(verifyCookies)

app.use("/api", apiRouter);
app.use("/", uiRouter);

app.listen(process.env.PORT, () => {
  console.log("Server Started at port "+process.env.PORT);
});
