'use strict';

var express = require('express');
var ProductController = require('../controllers/product');

var api = express.Router();

// Only admin
api.post('/add', ProductController.addProduct);
api.put('/update/:id', ProductController.updateProduct);
api.delete('/delete/:id', ProductController.removeProduct);

// No middleware
api.get('/search', ProductController.searchProduct);
api.get('/list', ProductController.searchProduct);

module.exports = api;