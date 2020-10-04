var express = require("express");
var sessionHelper = require('../modules/session-helper');
var Post = require('../modules/post');
var router = express.Router();

router.get("/", (req, res, next) => {
  let isUserSessionExists = sessionHelper.isUserSessionExists(req);
  if (isUserSessionExists) {
    Post.list()
      .then(response => {
        res.render("dashboard", { posts: response });
      })
      .catch(error => {
        res.send(error)
      });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
