const mongoose = require('mongoose');

/**
 * Animal
 */
const AnimalSchema = new mongoose.Schema({
    /**
     * Name of animal. Max lenght 250. [REQUIRED]
     */
    name: {
        type: String,
        index: true,
        required: [true, 'The name is required.']
    },
    /**
     * Type of animal. Max lenght 250. [REQUIRED]
     */
    type: {
        type: String,
        required: [true, 'The type is required.']
    },
    /**
     * Age of animal. [REQUIRED]
     */
    age: {
        type: Number,
        required: [true, 'The age is required.']
    },
    /**
     * Scientific name of animal. [REQUIRED]
     */
    scientific_name: {
        type: String,
        required: [true, 'The scientific_name is required.']
    }
}, {
    /**
     * Collation, define: locale and strenght.
     */
    collation: { locale: 'es', strength: 1 }
});

module.exports = mongoose.model('Animal', AnimalSchema);