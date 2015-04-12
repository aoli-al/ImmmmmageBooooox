var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var captcha = require('./controllers/captcha.js');
var session = require('express-session');
var multer = require('multer');
var mongoose = require('mongoose');
var fs = require('fs');


var app = express();
mongoose.connect('mongodb://localhost/imagebox');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

fs.readdirSync(__dirname + '/models').forEach(function (file) {
    console.log(file);
    if (~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

var users = require('./routes/users');
var folders = require('./routes/folders');
var images = require('./routes/images');
var routes = require('./routes/routes.js')

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'Aafsknlaw1240-,', 
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000}}));
app.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
    }
}));



app.get('/captcha.jpg', captcha.generate);

app.use('/', routes);
app.use('/users', users);
app.use('/images', images);
app.use('/folders', folders);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: "哇。。。瞎瞅啥",
    });
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});


app.listen(8000);

module.exports = app;
