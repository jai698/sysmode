const Assignment = require('../models/assignmentSchema');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const assignmentController = {
    // Add new assignment
    addAssignment: async (req, res) => {
        try {
            const assignment = await Assignment.create(req.body);
            return successResponse(res, 201, 'Assignment created successfully', assignment);
        } catch (error) {
            return errorResponse(res, 400, error.message);
        }
    },

    // Get assignments
    getAssignments: async (req, res) => {
        try {
            const { jobId } = req.query;
            const query = jobId ? { jobId } : {};
            const assignments = await Assignment.find(query);
            return successResponse(res, 200, 'Assignments retrieved successfully', assignments);
        } catch (error) {
            return errorResponse(res, 400, error.message);
        }
    }
};

module.exports = assignmentController;