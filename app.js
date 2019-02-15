'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Import routes
var product_routes = require('./routes/product');

/**
 * Add routes of products
 */
app.use('/v1/product', product_routes);

module.exports = app;