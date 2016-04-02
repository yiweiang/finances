require('dotenv').config();

const express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  middleware = require('./middleware'),
  routes = require('./routes/index'),
  users = require('./routes/users'),
  expenses = require('./routes/expenses'),
  oauth = require('./routes/oauth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

app
  .use(logger('dev'))
  .set('x-powered-by', false)
  .use(middleware.bodyParser.json)
  .use(middleware.bodyParser.urlencoded)
  .use(middleware.cookieParser)
  .use(middleware.session)
  .use(middleware.responseHelper)
  .use(middleware.flash)
  .use(middleware.oauth.passport.initialize())
  .use(middleware.oauth.passport.session());


// Routes
app
  .use('/auth/google', oauth)
  .use('/', middleware.oauth.isAuthorized, routes)
  .use('/users', middleware.oauth.isAuthorized, users)
  .use('/expenses', middleware.oauth.isAuthorized, expenses)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(middleware.errorHandler(app));

module.exports = app;
