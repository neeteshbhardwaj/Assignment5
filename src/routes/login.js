var express = require("express");
var sessionHelper = require('../modules/session-helper');
var User = require('../modules/user');
var router = express.Router();

router.get("/", sessionHelper.validate, (req, res, next) => {
  res.render("login", {errorMessage: ''});
});

router.post("/", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  User.find(email, password)
    .then((user) => {
      if (!user) {
        res.render("login", {errorMessage: 'Email or password is incorrect'});
      } else {
        req.session.user = user;
        res.redirect('/dashboard');
      }
    }).catch((err) => {
      throw err
    });
});

module.exports = router;
