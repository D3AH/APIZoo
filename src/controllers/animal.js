'use strict';

/**
 * Animal controller
 * @module controller/animal
 */

const Animal = require('../models/animal');
const User = require('../models/user');

/**
 * Adds a animal.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The response
 * @return     {Object}  Status error message || animal saved.
 */
function addAnimal(req, res) {
    var tempAnimal = new Animal(req.body);
    var validate = tempAnimal.validateSync();

    if(!validate) {
        tempAnimal
            .save()
            .then((animalSaved) => {
                animalSaved ? res.status(200).send({ animal: animalSaved }) : res.status(400).send({ message: 'Unexpected error.' });
            })
            .catch((err) => res.status(500).send({ err }));
    } else {
        res.status(400).send({ message: validate.message });
    }
}

/**
 * Removes a animal.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The response
 * @return      {String|Object}     Status error message || animal deleted.
 */
function removeAnimal(req, res) {
    Animal.findByIdAndDelete(req.params.id, (err, animal) => {
        animal ? res.status(200).send({ message: 'Animal successfully deleted.', animal }) : res.status(400).send({ message: 'Unexpected error. Maybe animal don\'t exist.' });
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * Update a animal.
 *
 * @param {Object} req     The request
 * @param {Object} res     The response
 * @returns     {String|Object}     Status error message || animal updated.
 */
function updateAnimal(req, res) {
    Animal.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, animal) => {
        animal ? res.status(200).send({ animal }) : res.status(500).send({ message: 'Animal dont found.' });
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * Search animals.
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @return String|Object|Array}     Status error message || animal searched.
 */
function searchAnimal(req, res) {
    /**
     * @TODO create a more complex search with multiple query params.
     */
    Animal.find({ name: new RegExp('.*'+req.query.name+'*.', 'i') }, (err, animals) => {
        animals ? res.status(200).send({ animals }) : res.status(500).send({ message: 'Animal dont found.' });
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * List animals.
 *
 * @param {Object} req The request
 * @param {Object} res The response
 */
function listAnimals(req, res) {
    Animal.find({/* All */ })
    .sort(req.query)
    .exec((err, animals) => {
        res.status(200).send({ animals });
    });
}

module.exports = {
    addAnimal,
    removeAnimal,
    updateAnimal,
    searchAnimal,
    listAnimals
}