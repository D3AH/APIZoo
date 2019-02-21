'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
/**
 * @TODO Get key of a file.
 */
var secret = 'secret_key_pls_use_env_file';

exports.createToken = function(user) {
    var { name, surname, email, role } = user;
    var payload = {
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