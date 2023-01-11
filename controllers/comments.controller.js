const CommentsService = require('../services/comments.service.js')

class CommentsController {
    constructor() {
        this.commentsService = new CommentsService()
    }
    writeComment = async (req, res, next) => {
        const userId = res.locals.userId
        const { postId } = req.params
        const { title, comment } = req.body;
        const result = await this.commentsService.writeComment(title, comment, postId,userId);
        res.status(result.status).json({ message: result.message, data: result.data })


    }
}

module.exports = CommentsController