const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy
const Schema = require("./model/schema");
const passport = require("passport");
const GOOGLE_CLIENT_ID =
  "931001681612-0r0inlobhaongomh4e3s3eh812dpmdq8.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const FACEBOOK_APP_ID = "541862254318486"


module.exports = (passport) => {
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      done(null, profile);
        console.log("google login", profile);
      try {
        // let user = await User.findOne({ googleId: profile.id });
        // if (!user) {
        //   // return done(null, user);
        //   console.log("not found")
        // } else {
          const newUser = await Schema( {
            googleId: profile.id,
            name: profile.displayName,
          }).save()
          console.log("dcdshfh", newUser);
          // return done(null, saveuser);
        // }
      } catch (error) {
        console.log(error);
      }
    }
  )
);
  }
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
