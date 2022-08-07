const LocalStrategy = require('passport-local');
const passport = require('passport');
const bcrypt = require('bcrypt');
const con = require("../../database/db")
const query = require("../../database/query")
module.exports = {

    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    },
    setStrategies: function (app) {

        passport.serializeUser((user, done) => {
            done(null, user.empid);
        });
        passport.deserializeUser((id, done) => {

            con.query(query.getUser(id), (err, res) => {
                if (err) console.error(err);
                done(null, res[0]);
            })
        })
        passport.use('guest-local', new LocalStrategy({
            usernameField: 'user',
            passwordField: 'password_user'
        },
            (username, password, done) => {

                // console.log(sessionData.user.userType)
                con.query(query.getLoginGuest(username), (err, result) => {
                    console.log('User', username, 'attempted to login');
                    if (err) { return done(err); }
                    if (result.length < 1) { return done(null, false, { message: 'User Not Registered' }); }
                    if (!bcrypt.compareSync(password, result[0].password)) {
                        return done(null, false, { message: 'Wrong Password' });
                    }
                    return done(null, result[0]);
                })
            }));
        passport.use('mentor-local', new LocalStrategy({
            usernameField: 'user',
            passwordField: 'password_user'
        },
            (username, password, done) => {

                // console.log(sessionData.user.userType)
                con.query(query.getLoginMentor(username), (err, result) => {
                    console.log('User', username, 'attempted to login');
                    if (err) { return done(err); }
                    if (result.length < 1) { return done(null, false, { message: 'User Not Registered' }); }
                    if (!bcrypt.compareSync(password, result[0].password)) {
                        return done(null, false, { message: 'Wrong Password' });
                    }
                    return done(null, result[0]);
                })
            }));

    }
}