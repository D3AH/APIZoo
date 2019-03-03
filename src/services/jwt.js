'use strict';

/**
 * Jwt service
 * @module service/jwt
 */

var jwt = require('jwt-simple');
var moment = require('moment');

// Import env
var env = require('../env');
var secret = env.secret_key;

/**
 * Creates a token.
 *
 * @param      {Object}  user    The user
 * @return     {String}  The token.
 */
exports.createToken = function(user) {
    var { _id, name, surname, email, role } = user;
    var payload = {
        _id,
        name,
        surname,
        email,
        role,
        iat: moment().unix(),
        // time of session: 30 days
        exp: moment().add(30, 'day').unix()
    };
    return jwt.encode(payload, secret);
}