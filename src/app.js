'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Import routes
var routes = {
    product: require('./routes/product'),
    category: require('./routes/category'),
    user: require('./routes/user'),
    bill: require('./routes/bill')
};

/**
 * @todo Revisar que hace esto. Sin esto body está vacio.
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add routes
app.use('/v1/product', routes.product);
app.use('/v1/category', routes.category);
app.use('/v1/user', routes.user);
app.use('/v1/bill', routes.bill);

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

module.exports = app;