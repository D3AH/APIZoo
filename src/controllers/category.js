'use strict';

/**
 * Category controller
 * @module controller/category
 */

const Category = require('../models/category');
const Product = require('../models/product');

/**
 * Adds a category.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The response
 * @return     {Object}  Status error message || category saved.
 */
function addCategory(req, res) {
    var tempCategory = new Category(req.body);
    var validate = tempCategory.validateSync();

    if(!validate) {
        Category.find({ code: tempCategory.code }, (err, categories) => {
            categories && categories.length ? res.status(500).send({ message: 'There is already a category with that code.' }) : tempCategory
            .save()
            .then((categorySaved) => {
                categorySaved ? res.status(200).send({ category: categorySaved }) : res.status(400).send({ message: 'Unexpected error.' });
            })
            .catch((err) => res.status(500).send({ err }));
        });
    } else {
        res.status(400).send({ message: validate.message });
    }
}

/**
 * Removes a category.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The response
 * @return      {String|Object}     Status error message || category deleted.
 */
function removeCategory(req, res) {
    var categoryId = req.params.id;

    Category.findByIdAndDelete(categoryId, (err, category) => {
        Category.findOne({ code: 'DEFAULT'}, (err, categoryDefault) => { 
            Product.updateMany({ category: categoryId }, { category: categoryDefault._id }, (err, products) => console.log(products));
            category ? res.status(200).send({ message: 'Category successfully deleted.', category }) : res.status(400).send({ message: 'Unexpected error. Maybe category don\'t exist.' });
        })
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * Update a category.
 *
 * @param {Object} req     The request
 * @param {Object} res     The response
 * @returns     {String|Object}     Status error message || category updated.
 */
function updateCategory(req, res) {
    Category.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, category) => {
        category ? res.status(200).send({ category }) : res.status(500).send({ message: 'Category dont found.' });
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * Search categories.
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @return String|Object|Array}     Status error message || category searched.
 */
function searchCategory(req, res) {
    /**
     * @TODO create a more complex search with multiple query params.
     */
    Category.find({ name: new RegExp('.*'+req.query.name+'*.', 'i') }, (err, categories) => {
        categories ? res.status(200).send({ categories }) : res.status(500).send({ message: 'Category dont found.' });
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * List categories.
 *
 * @param {Object} req The request
 * @param {Object} res The response
 */
function listCategories(req, res) {
    Category.find({/* All */ }, (err, categories) => {
        res.status(200).send({ categories });
    })
    .catch((err) => res.status(500).send({ err }));
}

module.exports = {
    addCategory,
    removeCategory,
    updateCategory,
    searchCategory,
    listCategories
}