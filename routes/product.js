'use strict';

var express = require('express');
var ProductController = require('../controllers/product');

var api = express.Router();

// POST
api.post('/add', ProductController.addProduct);

// DELETE
api.delete('/delete', ProductController.removeProduct);

module.exports = api;