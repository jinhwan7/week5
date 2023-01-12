const CommentsRepository = require('../repositories/comments.repository.js')
const joi = require('joi');
const { Comment, Post, User } = require('../models/index.js');



const commentSchema = joi.object({
    title: joi.string().required(),
    comment: joi.string().required(),
})

class CommentsService {
    constructor() {
        this.commentsRepository = new CommentsRepository(Comment, Post, User);
    }
    writeComment = async (title, comment, postId, userId) => {
        const post = await this.commentsRepository.findPost(postId)
        if (!post) {
            return {
                status: 404,
                message: "해당 게시글이 없습니다."
            }
        }
        const resultSchema = commentSchema.validate({ title, comment })
        if (resultSchema.error) {
            return {
                status: 400,
                message: "데이터형식이 올바르지 않습니다"
            }
        }

        const result = await this.commentsRepository.writeComment(title, comment, postId, userId);
        return {
            status: 200,
            message: "댓글작성에성공하였습니다"
        }
    }

    showAllComment = async (postId) => {
        const post = await this.commentsRepository.findPost(postId)
        if (!post) {
            return {
                status: 404,
                message: "해당 게시글이 없습니다."
            }
        }
        const result = await this.commentsRepository.showAllcomment(postId);
        const comments = JSON.parse(JSON.stringify(result));
        const mapingdata = comments.map(value => {
            return {
                commentId: value.commentId,
                UserId: value.UserId,
                PostId: value.PostId,
                title: value.title,
                comment: value.comment,
                createdAt: value.createdAt,
                updatedAt: value.updatedAt,
                nickname: value.User.nickname
            }
        })
        return {
            status: 200,
            message: "댓글전체조회성공",
            data: mapingdata
        }
    }

    modifyComment = async (commentId, title, comment, userId) => {
        const findedComment = await this.commentsRepository.findComment(commentId);
        if (!findedComment) {
            return {
                status: 404,
                message: "해당 댓글이 없습니다."
            }
        }

        const result = await this.commentsRepository.modifyComment(commentId, title, comment, userId)
        console.log(result)
        if (!result) {
            return {
                status: 400,
                message: "본인이 쓴 댓글이 아닙니다",
            }
        }
        return {
            status: 200,
            message: "댓글 수정 성공",
        }

    }

    deleteComment = async (commentId, userId) => {
        const findedComment = await this.commentsRepository.findComment(commentId);
        if (!findedComment) {
            return {
                status: 404,
                message: "해당 댓글이 없습니다."
            }
        }
        const result = await this.commentsRepository.deleteComment(commentId, userId);
        if (!result) {
            return {
                status: 400,
                message: "본인이 쓴 댓글이 아닙니다"
            }
        }
        return {
            status: 200,
            message: "댓글 삭제 성공"
        }
    }
}

module.exports = CommentsService;
