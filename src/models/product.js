const mongoose = require('mongoose');

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
     * Name of product. Max lenght 250. [REQUIRED]
     */
    name: {
        type: String,
        index: true,
        required: [true, 'The name is required.']
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
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'The category is required.']
    },
    /**
     * Stock: numbers of products avaible.
     */
     stock: {
        type: Number,
        default: 0,
        required: false,
     }
}, {
    /**
     * Collation, define: locale and strenght.
     */
    collation: { locale: 'es', strength: 1 }
});

ProductSchema.index({ code: 1, name: 'text' });

module.exports = mongoose.model('Product', ProductSchema);