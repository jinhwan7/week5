const CommentsService = require('../services/comments.service.js')

class CommentsController {
    constructor() {
        this.commentsService = new CommentsService()
    }
    writeComment = async (req, res, next) => {
        const userId = res.locals.userId
        const { postId } = req.params
        const { title, comment } = req.body;
        const result = await this.commentsService.writeComment(title, comment, postId, userId);
        res.status(result.status).json({ message: result.message, data: result.data })
    }

    showAllComment = async (req, res, next) => {
        const { postId } = req.params
        const result = await this.commentsService.showAllComment(postId);
        res.status(result.status).json({ message: result.message, data: result.data })
    }

    modifyComment = async (req, res, next) => {
        const { commentId } = req.params;
        const { title, comment } = req.body;
        const userId = res.locals.userId;
        const result = await this.commentsService.modifyComment(commentId, title, comment, userId);
        res.status(result.status).json({ message: result.message, data: result.data })
    }
    deleteComment = async (req, res, next) => {
        const { commentId } = req.params;
        const userId = res.locals.userId;
        const result = await this.commentsService.deleteComment( commentId, userId)
        res.status(result.status).json({ message: result.message, data: result.data })
    }
}

module.exports = CommentsController