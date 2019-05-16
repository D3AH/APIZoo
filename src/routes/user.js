'use strict';

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

/**
 * GET
 */
api.get('/',
    UserController.listUsers);

/**
 * POST
 */
api.post('/',
    UserController.addUser);
/**
 * PUT
 */
api.put('/:id',
    UserController.updateUser);

/**
 * DELETE
 */
api.delete('/:id',
    UserController.removeUser);

module.exports = api;