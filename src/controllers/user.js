'use strict';

var User = require('../models/user');

var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function saveUser(req, res) {
    var params = req.body;
    var user = new User(params);
    user.role = 'ROLE_CLIENT';
    user.image = null;

    // Check if it contains errors.
    if (!user.validateSync()) {
        User.findOne({ email: user.email}, (err, issetUser) => {
            if(!issetUser) {
                // ENCRYPT PASSWORD
                bcrypt.hash(params.password, null, null, (error, hash) => {
                    user.password = hash;
                    user.save()
                        .then((userStored) => {
                            res.status(200).send({ user: userStored });
                        })
                        .catch((error) => {
                            res.status(404).send({ message: 'No se ha podido registrar el usuario.' });
                        });
                });
            } else {
                res.status(200).send('El usuario no puede registrarse.');
            }
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        // In case of validation error
        console.log(user.validateSync().message);
        res.status(502).send('Not accept null values. ' + user.validateSync().message);
    }

    res.status(200);
}

function loginUser(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({ email: email }, (err, user) => {
        if(user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if(check) {
                    params.gettoken ? res.status(200).send({ token: jwt.createToken(user) }) : res.status(200).send(user);
                } else {
                    res.status(500).send({ message: 'Incorrect authentication.' });
                }
            });
        } else {
            console.log(user);
            res.status(500).send({ message: 'User not exist.' });
        }
    })
    .catch((err) => {
        res.status(500).send({ message: 'ERROR in login.' })
    })
}

function listUser(req, res) {
    User.find({/* All */}, (err, users) => {
        res.status(200).send(users);
    }).catch((err) => {
        res.status(500).send({ message: 'ERROR listing users.' })
    })
}

function deleteUser(req, res) {
    var id  = req.params.id;
    User.findOneAndDelete({ _id: id }, (err, user) => {
        if(!user) {
            res.status(404).send({ message: 'User not found.' });
        } else {
            res.status(200).send(user);
        }
    }).catch((err) => {
        logger.error(err);
        res.status(500).send({ message: 'ERROR deleting user.' })
    })
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findOneAndUpdate({ _id: userId }, update, { new: true }, (err, userUpdate) => {
        if(!userUpdate && !err) {
            res.status(404).send({
                message: 'No update.'
            });
        } else {
            res.status(200).send({
                user: userUpdate
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message: 'ERROR UPDATE',
            error: err
        });
    })
}

module.exports = {
    saveUser,
    loginUser,
    listUser,
    deleteUser,
    updateUser
};