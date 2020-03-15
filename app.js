const express = require('express');
const app = express();
const bodyParser = require('body-parser')
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.use(bodyParser.json());
app.set('view engine', 'html');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: '349312461778-dh0ti8bpoqgdoe550t94c3kt11keopl2.apps.googleusercontent.com',
    clientSecret: 'mDo5T7dG-1ZGBojiXSGGBli6',
    callbackURL: "http://localhost:3001/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile, accessToken, refreshToken);
    return done();
    //    User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //      return done(err, user);
    //    });
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/');
});

app.get('/', (req, res)=>{
    res.send('<a href="/auth/google">Sign In with Google</a>');
})

app.listen(3001, ()=>{
    console.log(`Running on ${3001}`);
})