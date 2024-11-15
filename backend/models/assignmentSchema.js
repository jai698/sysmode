const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    deadline: Date,
    status: {
        type: String,
        enum: ['PENDING', 'ACTIVE', 'COMPLETED'],
        default: 'PENDING'
    },
    questions: [{
        question: String,
        type: String,
        options: [String]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Assignment', assignmentSchema);