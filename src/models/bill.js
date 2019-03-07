'use strict';

const mongoose = require('mongoose');

/**
 * Bill
 */
const BillSchema = new mongoose.Schema({
    /**
     * Number of bill. [REQUIRED]
     */
    number: {
        type: String,
        index: true,
        unique: true,
        required: [true, 'The number is required.']
    },
    /**
     * User of bill. [REQUIRED]
     */
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'The user is required.']
    },
    /**
     * Collection to buy.
     */
    shopping: [{
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true,
        },
        number: Number,
    }]
}, {
    /**
     * Collation, define: locale and strenght.
     */
    collation: { locale: 'es', strength: 1 }
});

BillSchema.index({ number: 1, name: 'text' });

module.exports = mongoose.model('Bill', BillSchema);