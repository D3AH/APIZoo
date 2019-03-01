'use strict';

var express = require('express');
var ProductController = require('../controllers/product');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();


/**
 * GET
 */
api.get('/search',
    md_auth.ensureAut,
    ProductController.searchProduct);

api.get('/list',
    md_auth.ensureAut,
    ProductController.listProducts);

/**
 * POST
 */
api.post('/add',
    [md_auth.ensureAut,
    md_auth.ensureAutAdmin],
    ProductController.addProduct);

/**
 * PUT
 */
api.put('/update/:id',
    [md_auth.ensureAut,
    md_auth.ensureAutAdmin],
    ProductController.updateProduct);

/**
 * DELETE
 */
api.delete('/delete/:id',
    [md_auth.ensureAut,
    md_auth.ensureAutAdmin],
    ProductController.removeProduct);

module.exports = api;