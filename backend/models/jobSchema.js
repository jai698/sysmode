const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['FULLTIME', 'INTERNSHIP', 'UNPAID'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [String],
    status: {
        type: String,
        enum: ['ACTIVE', 'CLOSED'],
        default: 'ACTIVE'
    },
    automate: {
        enabled: Boolean,
        process: String
    },
    salary: {
        type: Number,
        required: function() {
            return this.type !== 'UNPAID';
        }
    },
    duration: String,
    location: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Job', jobSchema);