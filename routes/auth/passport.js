const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET_TOKEN
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    done(null, jwt_payload)
}));