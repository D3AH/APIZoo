'use strict';

/**
 * User controller
 * @module controller/user
 */

const User = require('../models/user');

/**
 * Adds a user.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The response
 * @return     {Object}  Status error message || user saved.
 */
function addUser(req, res) {
    var tempUser = new User(req.body);
    var validate = tempUser.validateSync();

    if(!validate) {
        tempUser
            .save()
            .then((userSaved) => {
                userSaved ? res.status(200).send({ user: userSaved }) : res.status(400).send({ message: 'Unexpected error.' });
            })
            .catch((err) => res.status(500).send({ err }));
    } else {
        res.status(400).send({ message: validate.message });
    }
}

/**
 * Removes a user.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The response
 * @return      {String|Object}     Status error message || user deleted.
 */
function removeUser(req, res) {
    User.findAndDelete({ _id: req.params.id }, (err, user) => {
        user ? res.status(200).send({ message: 'User successfully deleted.', user }) : res.status(400).send({ message: 'Unexpected error. Maybe user don\'t exist.' });
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * Update a user.
 *
 * @param {Object} req     The request
 * @param {Object} res     The response
 * @returns     {String|Object}     Status error message || user updated.
 */
function updateUser(req, res) {
    User.findAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, user) => {
        user ? res.status(200).send({ user }) : res.status(500).send({ message: 'User dont found.' });
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * Search users.
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @return String|Object|Array}     Status error message || user searched.
 */
function searchUser(req, res) {
    /**
     * @TODO create a more complex search with multiple query params.
     */
    User.find({ name: new RegExp('.*'+req.query.name+'*.', 'i') }, (err, users) => {
        users ? res.status(200).send({ users }) : res.status(500).send({ message: 'User dont found.' });
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * List users.
 *
 * @param {Object} req The request
 * @param {Object} res The response
 */
function listUsers(req, res) {
    User.find({/* All */ }, (err, users) => {
        res.status(200).send({ users });
    })
    .catch((err) => res.status(500).send({ err }));
}

module.exports = {
    addUser,
    removeUser,
    updateUser,
    searchUser,
    listUsers
}