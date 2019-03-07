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
        required: true,
        validate: {
            validator: (value) => {
                return value >= 0;
            },
            message: props => `The stock can't be ${props.value}, must be up to 0.`
        }
     },
     /**
     * Stock: numbers of products avaible.
     */
     sell: {
        type: Number,
        default: 0,
     }
}, {
    /**
     * Collation, define: locale and strenght.
     */
    collation: { locale: 'es', strength: 1 }
});

ProductSchema.index({ code: 1, name: 'text' });

module.exports = mongoose.model('Product', ProductSchema);