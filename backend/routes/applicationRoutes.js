const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.patch('/mark_eval_internshala', applicationController.markEvaluated);
router.patch('/mark_future_internshala', applicationController.markFuture);
router.post('/hire_candidate', applicationController.hireCandidate);

module.exports = router;