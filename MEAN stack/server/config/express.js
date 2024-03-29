const express = require('express');
const stylus = require('stylus');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


module.exports = function(app, config) {
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(session({secret: "multi vision unicorns", resave: false, saveUninitialized: false}));
    app.use(logger('dev'));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ));

    app.use(express.static(config.rootPath + "/public"));
}