'use strict';

/**
 * Bill controller
 * @module controller/bill
 */

const Bill = require('../models/bill');
const User = require('../models/user');
const Product = require('../models/product');

/**
 * Adds a bill.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The response
 * @return     {Object}  Status error message || bill saved.
 */
function addBill(req, res) {
    var tempBill = new Bill(req.body);
    tempBill.user = req.user._id;
    var validate = tempBill.validateSync();

    if(!validate) {
        Bill.find({ number: tempBill.number }, (err, bills) => {
            if (bills && bills.length) {
                res.status(500).send({ message: 'There is already a bill with that number.' })
            } else {
                User.findOne({ _id: req.user._id }, (err, user) => {
                    tempBill.shopping = user.shopping;
                    tempBill.shopping.forEach((shop) => {
                        Product.findOneAndUpdate({ _id: shop.product }, { $inc: { stock: -Math.abs(parseInt(shop.number)) }}, (err, response) => err);
                    })
                    tempBill
                        .save()
                        .then((billSaved) => {
                            billSaved ? res.status(200).send({ bill: billSaved }) : res.status(400).send({ message: 'Unexpected error.' });
                        })
                        .catch((err) => res.status(500).send({ err }));
                })
                .catch((err) => res.status(500).send({ err }));
            }
        });
    } else {
        res.status(400).send({ message: validate.message });
    }
}

/**
 * Removes a bill.
 *
 * @param      {Object}  req     The request
 * @param      {Object}  res     The response
 * @return      {String|Object}     Status error message || bill deleted.
 */
function removeBill(req, res) {
    Bill.findByIdAndDelete(req.params.id, (err, bill) => {
        bill ? res.status(200).send({ message: 'Bill successfully deleted.', bill }) : res.status(400).send({ message: 'Unexpected error. Maybe bill don\'t exist.' });
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * Update a bill.
 *
 * @param {Object} req     The request
 * @param {Object} res     The response
 * @returns     {String|Object}     Status error message || bill updated.
 */
function updateBill(req, res) {
    Bill.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, bill) => {
        bill ? res.status(200).send({ bill }) : res.status(500).send({ message: 'Bill dont found.' });
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * Search bills.
 *
 * @param {Object} req The request
 * @param {Object} res The response
 * @return String|Object|Array}     Status error message || bill searched.
 */
function searchBill(req, res) {
    /**
     * @TODO create a more complex search with multiple query params.
     */
    Bill.find({ name: new RegExp('.*'+req.query.name+'*.', 'i') }, (err, bills) => {
        bills ? res.status(200).send({ bills }) : res.status(500).send({ message: 'Bill dont found.' });
    })
    .catch((err) => res.status(500).send({ err }));
}

/**
 * List bills.
 *
 * @param {Object} req The request
 * @param {Object} res The response
 */
function listBills(req, res) {
    Bill.find({/* All */ }, (err, bills) => {
        res.status(200).send({ bills });
    })
    .catch((err) => res.status(500).send({ err }));
}

module.exports = {
    addBill,
    removeBill,
    updateBill,
    searchBill,
    listBills
}