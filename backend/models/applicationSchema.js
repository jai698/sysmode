const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    candidate: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        resume: String,
        phone: String
    },
    status: {
        type: String,
        enum: ['NEW', 'EVALUATED', 'FUTURE', 'HIRED', 'REJECTED'],
        default: 'NEW'
    },
    evaluationNotes: String,
    appliedDate: {
        type: Date,
        default: Date.now
    },
    lastUpdated: Date
});

module.exports = mongoose.model('Application', applicationSchema);