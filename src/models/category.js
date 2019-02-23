const mongoose = require('mongoose');

/**
 * Category
 */
const CategorySchema = new mongoose.Schema({
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
     * Name of category.  [REQUIRED][UNIQUE]
     */
    description: {
        type: String,
        index: true,
        unique: true,
        required: [true, 'The description is required.']
    },
}, {
    /**
     * Collation, define: locale and strenght.
     */
    collation: { locale: 'es', strength: 1 }
});

CategorySchema.index({ code: 1 });

module.exports = mongoose.model('Category', CategorySchema);