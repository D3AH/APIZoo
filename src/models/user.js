const mongoose = require('mongoose');

// Mongoose types
require('mongoose-type-email');

/**
 * User
 */
const UserSchema = new mongoose.Schema({
    /**
     * Email of user.  [REQUIRED][UNIQUE]
     */
    email: {
        type: String,
        index: true,
        unique: true,
        required: [true, 'The email is required.']
    },
    /**
     * Name of user.  [REQUIRED]
     */
    name: {
        type: String,
        required: [true, 'The name is required.']
    },
    /**
     * Surname of user. [REQUIRED]
     */
    surname: {
        type: String,
        required: [true, 'The surname is required.']
    },
    /**
     * Password of user. [REQUIRED]
     */
    password: {
        type: String,
        required: [true, 'The password is required.']
    },
    /**
     * Role of user.
     */
    role: {
        type: String,
        required: false,
        default: 'ROLE_CLIENT'
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

UserSchema.index({ email: 1 });

module.exports = mongoose.model('User', UserSchema);