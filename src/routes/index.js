var express = require("express");
var sessionHelper = require('../modules/session-helper');
var router = express.Router();

router.get("/", sessionHelper.validate, function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
