const Application = require('../models/applicationSchema');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const applicationController = {
    // Mark application as evaluated
    markEvaluated: async (req, res) => {
        try {
            const { applicationId, notes } = req.body;
            const application = await Application.findByIdAndUpdate(
                applicationId,
                {
                    status: 'EVALUATED',
                    evaluationNotes: notes,
                    lastUpdated: new Date()
                },
                { new: true }
            );
            return successResponse(res, 200, 'Application marked as evaluated', application);
        } catch (error) {
            return errorResponse(res, 400, error.message);
        }
    },

    // Mark for future consideration
    markFuture: async (req, res) => {
        try {
            const { applicationId, notes } = req.body;
            const application = await Application.findByIdAndUpdate(
                applicationId,
                {
                    status: 'FUTURE',
                    evaluationNotes: notes,
                    lastUpdated: new Date()
                },
                { new: true }
            );
            return successResponse(res, 200, 'Application marked for future consideration', application);
        } catch (error) {
            return errorResponse(res, 400, error.message);
        }
    },

    // Hire candidate
    hireCandidate: async (req, res) => {
        try {
            const { applicationId } = req.body;
            const application = await Application.findByIdAndUpdate(
                applicationId,
                {
                    status: 'HIRED',
                    lastUpdated: new Date()
                },
                { new: true }
            );
            return successResponse(res, 200, 'Candidate hired successfully', application);
        } catch (error) {
            return errorResponse(res, 400, error.message);
        }
    }
};

module.exports = applicationController;