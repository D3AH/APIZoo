'use strict';

const mongoose = require('mongoose');

// Mongoose types
require('mongoose-type-email'); 

/**
 * Product
 */
const ProductSchema = new mongoose.Schema({
    /**
     * Code of product. [REQUIRED]
     */
    code: {
        type: String,
        required: [true, 'The code is required.']
    },
    /**
     * Description of product. Max lenght 250. [REQUIRED]
     */
    description: {
        type: String,
        required: [true, 'The description is required.']
    },
    /**
     * Category of product. [REQUIRED]
     */
    category: {
        type: String,
        required: [true, 'The category is required.']
    }
});

module.exports = mongoose.model('Product', ProductSchema);