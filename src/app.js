'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Import routes
var routes = {
    animal: require('./routes/animal'),
    user: require('./routes/user')
};

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


/**
 * @todo Revisar que hace esto. Sin esto body está vacio.
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add routes
app.use('/v1/animal', routes.animal);
app.use('/v1/user', routes.user);
// CORS

module.exports = app;