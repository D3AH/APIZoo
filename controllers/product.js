'use strict';

/**
 * Product controller
 * @module controllers/product
 */

var Product = require('../models/product');

/**
 * Adds a product.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The response
 * @return     {String} TypeOf request.
 */
function addProduct(req, res) {
    res.status(200).send(typeof(req));
}

/**
 * Removes a product.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The response
 */
function removeProduct(req, res) {
    res.status(200).send(typeof(req));
}

module.exports = {
    addProduct,
    removeProduct
}