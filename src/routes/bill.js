'use strict';

var express = require('express');
var BillController = require('../controllers/bill');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

// Only admin.
api.post('/add', [md_auth.ensureAut, md_auth.ensureAutAdmin], BillController.addBill);
api.put('/update/:id', [md_auth.ensureAut, md_auth.ensureAutAdmin], BillController.updateBill);
api.delete('/delete/:id', [md_auth.ensureAut, md_auth.ensureAutAdmin], BillController.removeBill);

// Every user.
api.get('/search', md_auth.ensureAut, BillController.searchBill);
api.get('/list', md_auth.ensureAut, BillController.listBills);

module.exports = api;