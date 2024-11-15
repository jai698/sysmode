const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    },
    type: {
        type: String,
        enum: ['CANDIDATE', 'BOT', 'SYSTEM'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sender: String,
    receiver: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Message', messageSchema);