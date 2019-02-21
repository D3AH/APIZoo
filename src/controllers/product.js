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
 * @return     {Object}  Status error message || product saved.
 */
function addProduct(req, res) {
    var tempProduct = new Product(req.body);
    var validate = tempProduct.validateSync();

    if(!validate) {
        Product.find({ code: tempProduct.code }, (err, products) => {
            products && products.length ? res.status(500).send({ message: 'There is already a product with that code.' }) : tempProduct
            .save()
            .then((productSaved) => {
                productSaved ? res.status(200).send({ product: productSaved }) : res.status(400).send({ message: 'Unexpected error.' });
            })
            .catch((err) => res.status(500).send({ message: 'Internal error server.' }));
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
 * @return      {String|Object}     Status error message || product deleted.
 */
function removeProduct(req, res) {
    Product.findByIdAndDelete(req.params.id, (err, product) => {
        product ? res.status(200).send({ message: 'Product successfully deleted.', product }) : res.status(400).send({ message: 'Unexpected error. Maybe product don\'t exist.' });
    })
    .catch((err) => res.status(500).send({ message: err }));
}

/**
 * Update a product.
 *
 * @param {Object} req     The request
 * @param {Object} res     The response
 * @returns     {String|Object}     Status error message || product updated.
 */
function updateProduct(req, res) {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, product) => {
        product ? res.status(200).send({ product }) : res.status(500).send({ message: 'Product dont found.' });
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * Search products.
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @return String|Object|Array}     Status error message || product searched.
 */
function searchProduct(req, res) {
    /**
     * @TODO create a more complex search with multiple query params.
     */
    Product.find({ name: new RegExp('.*'+req.query.name+'*.', 'i') }, (err, products) => {
        products ? res.status(200).send({ products }) : res.status(500).send({ message: 'Product dont found.' });
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * List products.
 *
 * @param {Object} req The request
 * @param {Object} res The response
 */
function listProducts(req, res) {
    Product.find({/* All */ }, (err, products) => {
        res.status(200).send({ products });
    })
    .catch((err) => res.status(500).send({ err }));
}

module.exports = {
    addProduct,
    removeProduct,
    updateProduct,
    searchProduct,
    listProducts
}