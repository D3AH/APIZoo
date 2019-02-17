'use strict';

/**
 * Product controller
 * @module controller/product
 */

const Product = require('../models/product');

/**
 * Adds a product.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The response
 * @return     {Object}  Product saved.
 */
function addProduct(req, res) {
    var tempProduct = new Product(req.body);
    var validate = tempProduct.validateSync();

    if(!validate) {
        Product.find({ code: tempProduct.code }, (err, products) => {
            return products ? res.status(500).send({ message: 'There is already a product with that code.' }) : tempProduct
            .save((err, productSaved) => {
                return productSaved ? res.status(200).send({ product: productSaved }) : res.status(400).send({ message: 'Unexpected error.' });
            }).catch((err) => {
                return res.status(500).send({ message: 'Internal error server.' });
            });
        });
    } else {
        res.status(400).send({ message: validate.message });
    }
}

/**
 * Removes a product.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The response
 * @return      {String} Typeof request.
 */
function removeProduct(req, res) {
    res.status(200).send(typeof(req));
}

module.exports = {
    addProduct,
    removeProduct
}