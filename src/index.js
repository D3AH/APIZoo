'use strict';

var mongoose = require('mongoose');
var app = require('./app');

var port = process.env.PORT || 3789;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/2014277Zoologico',
    { useNewUrlParser: true})
    .then(() => {
        console.log('Database connection successful');
        /**
         * App is express server.
         */
        app.listen(port, () => {
            console.log('Server init. http://localhost:3789');
        });
    })
    .catch((err) => { console.log(err)});
