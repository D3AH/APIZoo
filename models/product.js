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
        index: true,
        unique: true,
        required: [true, 'The code is required.']
    },
    /**
     * Description of product. Max lenght 250. [REQUIRED]
     */
    description: {
        type: String,
        index: true,
        required: [true, 'The description is required.']
    },
    /**
     * Category of product. [REQUIRED]
     */
    category: {
        type: String,
        required: [true, 'The category is required.']
    }
}, {
    /**
     * Collation, define: locale and strenght.
     */
    collation: { locale: 'es', strength: 1 }
});

ProductSchema.index({ code: 1, description: 'text' });

module.exports = mongoose.model('Product', ProductSchema);