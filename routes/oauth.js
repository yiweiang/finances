const router   = require('express').Router(),
      passport = require('passport');

router
  .get('/', passport.authenticate('google', {
    failureRedirect: '/auth/google/authenticate-fail',
    successRedirect: '/auth/google/callback',
    scope: ['profile', 'email']
  }))

  .get('/callback', passport.authenticate('google'), function(req, res) {
    console.log(req.user.displayName)
    if(req.user.email.indexOf('@tradegecko.com') != -1) {
      res.redirect("/");
    } else {
      req.flash('error', 'Not a TradeGecko Email.');
      res.redirect("/auth/google/login");
    }
  })

  .get('/authenticate-fail', function(res, req) {
    res.send('Not authorized: Cannot authenticate with Google Oauth');
  })

  .get('/login', function(req, res) {
    res.addLocals({ error: req.flash('error') });
    res.render('login');
  })

  .get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

module.exports = router;
