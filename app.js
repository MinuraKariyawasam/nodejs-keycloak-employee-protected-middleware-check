var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memoryStore = new session.MemoryStore();

var app = express();

app.use(session({ secret: '356b713d-3e57-4310-b08a-93493a0934f1', resave: false, saveUninitialized: true, store: memoryStore }));
var keycloak = require('./config/keycloak-config.js').initKeycloak(memoryStore);
app.use(keycloak.middleware());

var employeeRouter = require('./routes/employees');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employees', employeeRouter);

module.exports = app;
