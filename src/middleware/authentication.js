//authentication.js
const passport = require('passport');
const userModel = require('../model/user');
const Jwtstrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const CONFIG = require('../config/config')

passport.use(
    new Jwtstrategy(
        {
            secretOrKey: CONFIG.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        function (payload, done) {
            userModel.findById(payload.id, function(error,user) {
                if(error) {
                    return done(null, user)
                }
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            })
        }
    )
)
