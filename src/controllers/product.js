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
            products && products.length ? res.status(500).send({ message: 'There is already a product with that code.' }) : tempProduct
            .save()
            .then((productSaved) => {
                productSaved ? res.status(200).send({ product: productSaved }) : res.status(400).send({ message: 'Unexpected error.' });
            }).catch((err) => {
                res.status(500).send({ message: 'Internal error server.' });
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
    Product.findByIdAndDelete(req.params.id, (err, product) => {
        product ? res.status(200).send({ message: 'Product successfully deleted.', product }) : res.status(400).send({ message: 'Unexpected error. Maybe product don\'t exist.' });
    })
    .catch((err) => {
        res.status(500).send({ message: err });
    });
}

/**
 * Update a product.
 *
 * @param      {<type>}  req     The request
 * @param      {<type>}  res     The resource
 */
function updateProduct(req, res) {
    Product.findOneAndUpdate(
        { _id: req.params.id },
        req.params.body,
        { new: true },
        (err, productUpdate) => {
            if(!productUpdate) {
                res.status(404).send({
                    message: 'No update. Not found product or not have permissions.'
                });
            } else {
                res.status(200).send({
                    product: productUpdate
                });
            }
    }).catch((err) => {
        
    });
}

module.exports = {
    addProduct,
    removeProduct
}