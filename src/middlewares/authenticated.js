'use strict';

/**
 * Authenticated a user and decode the token to save in request.user
 * 
 * @module middleware/authenticated
 */

var jwt = require('jwt-simple');
var moment = require('moment');

// Import env
var env = require('../env');
var secret = env.secret_key;

function ensureAut(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(400).send({ message: 'The request must contain a Authorization header.' });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()) {
            return res.status(404).send({
                message: 'El token ha expirado.'
            });
        }
    } catch(exp) {
        return res.status(404).send({
            message: 'El token no es valido.'
        });
    }
    req.user = payload;
    next();
}

function ensureAutAdmin(req, res, next) {
    (req.user.role === 'ROLE_ADMIN') ? next() : res.status(400).send({ message: 'Forbidden! Only admins.' });
}

module.exports = {
    ensureAut,
    ensureAutAdmin
}