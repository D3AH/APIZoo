'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Import routes
var product_routes = require('./routes/product');
var category_routes = require('./routes/category');

/**
 * @todo Revisar que hace esto. Sin esto body está vacio.
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add routes
app.use('/v1/product', product_routes);
app.use('/v1/category', category_routes);

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

module.exports = app;