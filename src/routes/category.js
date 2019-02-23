'use strict';

var express = require('express');
var CategoryController = require('../controllers/category');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

// Only admin.
api.post('/add', [md_auth.ensureAut, md_auth.ensureAutAdmin], CategoryController.addCategory);
api.put('/update/:id', [md_auth.ensureAut, md_auth.ensureAutAdmin], CategoryController.updateCategory);
api.delete('/delete/:id', [md_auth.ensureAut, md_auth.ensureAutAdmin], CategoryController.removeCategory);

// Every user.
api.get('/search', md_auth.ensureAut, CategoryController.searchCategory);
api.get('/list', md_auth.ensureAut, CategoryController.listCategories);

module.exports = api;