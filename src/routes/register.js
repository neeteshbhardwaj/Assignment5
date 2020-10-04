var express = require("express");
var sessionHelper = require('../modules/session-helper');
var User = require('../modules/user');
var router = express.Router();

router.get("/", sessionHelper.validate, (req, res, next) => {
  res.render("register");
});

router.post("/", (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth
  })
    .then(user => {
      req.session.user = user;
      res.redirect('/dashboard');
    })
    .catch(error => {
      res.redirect('/register');
    });
});

module.exports = router;
