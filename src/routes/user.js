'use strict';

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated');


var api = express.Router();

/**
 * GET
 */
api.get('/all',
    [md_auth.ensureAut,
    md_auth.ensureAutAdmin],
    UserController.listUsers);

/**
 * POST
 */
api.post('/add',
    [md_auth.ensureAut,
    md_auth.ensureAutAdmin],
    UserController.addUser);

api.post('/login',
    UserController.loginUser);

/**
 * PUT
 */
api.put('/update/:id',
    md_auth.ensureAut,
    UserController.updateUser);

/**
 * DELETE
 */
api.delete('/delete/:id',
    [md_auth.ensureAut,
    md_auth.ensureAutAdmin],
    UserController.removeUser);

module.exports = api;