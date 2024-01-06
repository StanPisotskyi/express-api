const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../model/User');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'register',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async ( req, email, password, done) => {
            try {
                const existedUser = await UserModel.findOne({ email });

                if (existedUser) {
                    return done('You can\'t use this email');
                }

                const { firstName, lastName } = req.body;
                const user = await UserModel.create({ firstName, lastName, email, password });
                return done(null, user);
            } catch (error) {
                console.log(error);
                return done(error);
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email });

                if (!user) {
                    return done(null, false, {message: 'Unauthorized'});
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, {message: 'Wrong Credentials'});
                }

                return done(null, user, {message: 'Logged in Successfully'});
            } catch (error) {
                console.log(error);
                return done(error);
            }
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'pUtInHuYlO',
            jwtFromRequest: ExtractJWT.fromHeader('auth')
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                return done(error);
            }
        }
    )
);