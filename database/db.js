
require("dotenv").config();
var mysql = require("mysql");
var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
module.exports = con;