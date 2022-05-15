const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy
const TwitterStrategy = require("passport-twitter").Strategy

const Schema = require("./model/schema");
const passport = require("passport");
const GOOGLE_CLIENT_ID =
  "931001681612-0r0inlobhaongomh4e3s3eh812dpmdq8.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const FACEBOOK_APP_ID = "2356245677874772"
const FACEBOOK_APP_SECRET = "965dd0efab0a50ea2c1533d2df5a0ccd"

const TWITTER_CONSUMER_KEY = "7l3K8CxS6WtlErDtjXh7K4xoJ"
const TWITTER_CONSUMER_SECRET = "fvQBJUxBmP8zrvmNfE6AVmAK8KLpezHYKNgSlb7pHtHKBwBFLt"

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

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:5000/auth/facebook/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      done(null, profile);
        console.log("facebook login", profile);
      try {
        // let user = await User.findOne({ googleId: profile.id });
        // if (!user) {
        //   // return done(null, user);
        //   console.log("not found")
        // } else {
          const newUser = await Schema( {
            facebookId: profile.id,
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


// for twitter
passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: "http://localhost:5000/auth/twitter/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      done(null, profile);
        console.log("Twitter login", profile);
      try {
        // let user = await User.findOne({ googleId: profile.id });
        // if (!user) {
        //   // return done(null, user);
        //   console.log("not found")
        // } else {
          const newUser = await Schema( {
            twitterId: profile.id,
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
