var express = require("express");
var sessionHelper = require('../modules/session-helper');
var router = express.Router();

router.get('/', sessionHelper.invalidate, (req, res, next) => {
    res.redirect('/');
});

module.exports = router;
