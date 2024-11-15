const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/getMessage/:applicationId', messageController.getMessages);
router.post('/send_message', messageController.sendMessage);
router.post('/replyCandidateBot', messageController.replyWithBot);

module.exports = router;