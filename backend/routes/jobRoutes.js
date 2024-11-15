const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Job posting routes
router.post('/make_Job', jobController.createFullTimeJob);
router.post('/make_Internship', jobController.createInternship);
// router.post('/make_undpaid', jobController.createUnpaidInternship);

// Job listing routes
router.get('/activeListing', jobController.getActiveListings);
// router.get('/closedListings', jobController.getClosedListings);
router.post('/automate_Listing', jobController.automateListing);
// router.post('/get_listings', jobController.getListings);

module.exports = router;