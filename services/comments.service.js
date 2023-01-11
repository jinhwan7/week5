const CommentsRepository = require('../repositories/comments.repository.js')
const joi = require('joi');
const {Comment} = require('../models/index.js');


const commentSchema = joi.object({
    title: joi.string().required(),
    comment: joi.string().required(),
})

class CommentsService {
    constructor() {
        this.commentsRepository = new CommentsRepository(Comment);
    }
    writeComment = async (title, comment, postId, userId) => {
        const resultSchema = commentSchema.validate({ title, comment })
        if (resultSchema.error) {
            return {
                status: 400,
                message: "데이터형식이 올바르지 않습니다"
            }
        }

        const result = await this.commentsRepository.writeComment(title, comment, postId, userId);
        console.log(result);
        return {
            status: 200,
            message: "댓글작성에성공하였습니다"
        }
    }
}

module.exports = CommentsService;
