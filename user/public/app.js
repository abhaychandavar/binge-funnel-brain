"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var authRouter = require('./routes/v1/auth');
var usersRouter = require('./routes/v1/routes');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
//# sourceMappingURL=app.js.map