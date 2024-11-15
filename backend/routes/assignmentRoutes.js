const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

router.put('/add_assignment', assignmentController.addAssignment);
router.post('/getAssignments', assignmentController.getAssignments);

module.exports = router;