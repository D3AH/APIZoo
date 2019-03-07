'use strict';

var express = require('express');
var CategoryController = require('../controllers/category');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

/**
 * GET
 */
api.get('/search',
    md_auth.ensureAut,
    CategoryController.searchCategory);


api.get('/list',
    md_auth.ensureAut,
    CategoryController.listCategories);


/**
 * POST
 */
api.post('/add',
    // [md_auth.ensureAut,
    // md_auth.ensureAutAdmin],
    CategoryController.addCategory);

/**
 * PUT
 */
api.put('/update/:id',
    [md_auth.ensureAut,
    md_auth.ensureAutAdmin],
    CategoryController.updateCategory);

/**
 * DELETE
 */
api.delete('/delete/:id',
    [md_auth.ensureAut,
    md_auth.ensureAutAdmin],
    CategoryController.removeCategory);

module.exports = api;