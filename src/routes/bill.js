'use strict';

var express = require('express');
var BillController = require('../controllers/bill');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();


/**
 * GET
 */
api.get('/search',
    md_auth.ensureAut,
    BillController.searchBill);

api.get('/list',
    md_auth.ensureAut,
    BillController.listBills);

/**
 * POST
 */
api.post('/add',
    [md_auth.ensureAut, md_auth.ensureAutAdmin],
    BillController.addBill);

/**
 * PUT
 */
api.put('/update/:id',
    [md_auth.ensureAut, md_auth.ensureAutAdmin],
    BillController.updateBill);

/**
 * DELETE
 */
api.delete('/delete/:id',
    [md_auth.ensureAut, md_auth.ensureAutAdmin],
    BillController.removeBill);

module.exports = api;