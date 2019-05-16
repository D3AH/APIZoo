'use strict';

var express = require('express');
var AnimalController = require('../controllers/animal');

var api = express.Router();

/**
 * GET
 */
api.get('/search',
    AnimalController.searchAnimal);

api.get('/',
    AnimalController.listAnimals);

/**
 * POST
 */
api.post('/',
    AnimalController.addAnimal);

/**
 * PUT
 */
api.put('/:id',
    AnimalController.updateAnimal);

/**
 * DELETE
 */
api.delete('/:id',
    AnimalController.removeAnimal);

module.exports = api;