const Message = require('../models/messageSchema');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const messageController = {
    // Get messages for an application
    getMessages: async (req, res) => {
        try {
            const { applicationId } = req.params;
            const messages = await Message.find({ applicationId })
                .sort({ timestamp: 1 });
            return successResponse(res, 200, 'Messages retrieved successfully', messages);
        } catch (error) {
            return errorResponse(res, 400, error.message);
        }
    },

    // Send message
    sendMessage: async (req, res) => {
        try {
            const { applicationId, content, type } = req.body;
            const message = await Message.create({
                applicationId,
                content,
                type,
                timestamp: new Date()
            });
            return successResponse(res, 201, 'Message sent successfully', message);
        } catch (error) {
            return errorResponse(res, 400, error.message);
        }
    },

    // Reply with bot
    replyWithBot: async (req, res) => {
        try {
            const { applicationId, content } = req.body;
            const message = await Message.create({
                applicationId,
                content,
                type: 'BOT',
                timestamp: new Date()
            });
            return successResponse(res, 201, 'Bot reply sent successfully', message);
        } catch (error) {
            return errorResponse(res, 400, error.message);
        }
    }
};

module.exports = messageController;