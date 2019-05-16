const mongoose = require('mongoose');

/**
 * User
 */
const UserSchema = new mongoose.Schema({
    /**
     * Name of user.  [REQUIRED]
     */
    name: {
        type: String,
        required: [true, 'The name is required.']
    },
    /**
     * Role of user.
     */
    role: {
        type: String,
        required: false,
        default: 'ROLE_ASSISTANT'
    },
    /**
     * Phone number of user. [REQUIRED]
     */
    phone_number: {
        type: String,
        required: [true, 'The phone_number is required.']
    },
    /**
     * Animals to care.
     */
    animals: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Animal',
        required: true
    }]
}, {
    /**
     * Collation, define: locale and strenght.
     */
    collation: { locale: 'es', strength: 1 }
});

UserSchema.index({ name: 1 });

module.exports = mongoose.model('User', UserSchema);