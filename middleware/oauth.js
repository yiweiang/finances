const router = require('express').Router(),
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user, done) {
  var gecko = user.email.indexOf('@tradegecko.com') !== -1 ? true : false;
  done(null, { email: user.email, gecko: gecko, displayName: user.displayName });
});

passport.deserializeUser(function(session, done) { done(null, session); });

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile);

}));

var isAuthorized = function(req, res, next) {
  if (req.isAuthenticated() && req.session.passport.user.gecko) {
    console.log(req.session.passport.user)
    res.addLocals({ email: req.session.passport.user.email, displayName: req.session.passport.user.displayName });
    return next();
  }
  res.redirect("/auth/google/login");
};

module.exports = {
  passport: passport,
  isAuthorized: isAuthorized
};
