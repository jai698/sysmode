const Job = require('../models/jobSchema');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const jobController = {
    // Create full-time job
    createFullTimeJob: async (req, res) => {
        try {
            // Extract data from request body
            const { title, description, requirements, salary, location } = req.body;

            // Create job data object with all fields
            const jobData = {
                type: 'FULLTIME',
                title: title,
                description: description, 
                requirements: requirements,
                salary: salary,
                location: location
            };

            // Save the job to database
            const job = await Job.create(jobData);

            // Return success response
            return successResponse(res, 201, 'Job created successfully', job);
        } catch (error) {
            // Return error if something goes wrong
            return errorResponse(res, 400, error.message);
        }
    },

    // Create internship
    createInternship: async (req, res) => {
        try {
            // Extract data from request body
            const { title, description, requirements, salary, duration, location } = req.body;

            // Create job data object with all fields
            const jobData = {
                type: 'INTERNSHIP',
                title: title,
                description: description,
                requirements: requirements,
                salary: salary,
                duration: duration,
                location: location
            };

            // Save the internship to database
            const job = await Job.create(jobData);

            // Return success response
            return successResponse(res, 201, 'Internship created successfully', job);
        } catch (error) {
            // Return error if something goes wrong
            return errorResponse(res, 400, error.message);
        }
    },

    // Get active listings
    getActiveListings: async (req, res) => {
        try {
            // Find all jobs with 'ACTIVE' status
            const jobs = await Job.find({ status: 'ACTIVE' });
            return successResponse(res, 200, 'Active listings retrieved successfully', jobs);
        } catch (error) {
            return errorResponse(res, 400, error.message);
        }
    },

    // Automate listing
    automateListing: async (req, res) => {
        try {
            // Extract listingId and process from request body
            const { listingId, process } = req.body;

            // Update the job with automation settings
            const job = await Job.findByIdAndUpdate(
                listingId,
                {
                    automate: { enabled: true, process }
                },
                { new: true }
            );
            return successResponse(res, 200, 'Listing automated successfully', job);
        } catch (error) {
            return errorResponse(res, 400, error.message);
        }
    }
};

module.exports = jobController;