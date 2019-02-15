'use strict';

var mongoose = require('mongoose');
var app = require('./app');

var port = process.env.PORT || 3789;

/**
 * App is express server.
 */
app.listen(port, () => {
    console.log('Server init. http://localhost:3789');
});