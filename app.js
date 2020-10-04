var express = require("express");
var path = require("path");
var createError = require("http-errors");
var cookieParser = require("cookie-parser");
var session = require('express-session');
var logger = require("morgan");
var engine = require("ejs-locals");
var dummyDataProvider = require("./src/modules/dummy-data-provider");

var app = express();

// view engine setup
app.engine("ejs", engine);
app.set("views", "./src/views/pages");
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "resources")));

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  res.locals.req = req;
  res.locals.res = res;
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

// Routing
app.use("/", require("./src/routes/index"));
app.use("/login", require("./src/routes/login"));
app.use("/logout", require("./src/routes/logout"));
app.use("/register", require("./src/routes/register"));
app.use("/about", require("./src/routes/about"));
app.use("/dashboard", require("./src/routes/dashboard"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
