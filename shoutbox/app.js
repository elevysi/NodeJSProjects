const entries = require('./routes/entries');
const validate = require('./middleware/validate');
const register = require('./routes/register');
const session = require('express-session');
const messages = require('./routes/messages');
const login = require('./routes/login');
const user = require('./middleware/user');
const api = require('./routes/api');
const Entry = require('./models/entry');
const page = require('./middleware/page');


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
	secret: 'secret',
	resave: false, saveUninitialized: true
}));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api.auth);

app.use(user);
app.use(messages);



// app.use('/', index);
app.get('/', entries.list);
app.use('/users', users);
app.get('/post', entries.form);
app.post('/post',
	validate.required('entry[title]'),
	validate.lengthAbove('entry[title]', 4),
	entries.submit);

app.get('/register', register.form);
app.post('/register', register.submit);
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);

app.get('/api/user/:id', api.user);
app.post('/api/entry', entries.submit);
app.get('/api/entries/:page?', page(Entry.count), api.entries);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
