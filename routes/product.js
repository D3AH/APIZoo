'use strict';

var express = require('express');
var ProductController = require('../controllers/product');

var api = express.Router();

api.get('/add', ProductController.addProduct);

module.exports = api;