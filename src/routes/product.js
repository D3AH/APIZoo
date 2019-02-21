'use strict';

var express = require('express');
var ProductController = require('../controllers/product');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

// Only admin.
api.post('/add', [md_auth.ensureAut, md_auth.ensureAutAdmin], ProductController.addProduct);
api.put('/update/:id', [md_auth.ensureAut, md_auth.ensureAutAdmin], ProductController.updateProduct);
api.delete('/delete/:id', [md_auth.ensureAut, md_auth.ensureAutAdmin], ProductController.removeProduct);

// Every user.
api.get('/search', md_auth.ensureAut, ProductController.searchProduct);
api.get('/list', md_auth.ensureAut, ProductController.listProducts);

module.exports = api;