const express = require("express");
const router = express.Router();
const passport = require("passport");
const users = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");

router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
      keepSessionInfo: true,
    }),
    users.login
  );

router.get("/logout", users.logout);

module.exports = router;

// const redirectUrl = req.session.returnTo;
// // delete req.session.returnTo;
// console.log(req.originalUrl);
