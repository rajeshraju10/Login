const express = require("express");

const app = express.Router();
const passport = require("passport");
const { signup, signin } = require("../controller/auth");

const ClIENT_URL = "http://localhost:3001/";

app.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "success",
      user: req.user,
    });
  }
});

app.get("/login/failed", (req, res) => {
  res.json({
    success: false,
    message: "failure",
  });
});

app.get("/google", passport.authenticate("google", { scope: ["profile"] }));

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: ClIENT_URL,
    failureRedirect: "/login/failed",
  })
);

app.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

app.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: ClIENT_URL,
    failureRedirect: "/login/failed",
  })
);

app.post("/singup", signup);
app.post("/signin", signin);
module.exports = app;
