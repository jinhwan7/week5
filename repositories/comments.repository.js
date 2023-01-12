class CommentsRepository {
    constructor(Comment, Post, User) {
        this.Comment = Comment
        this.Post = Post
        this.User = User
    }

    writeComment = async (title, comment, postId, userId) => {
        const result = await this.Comment.create({
            PostId: postId,
            UserId: userId,
            title: title,
            comment: comment,
        });
        return result

    }
    findPost = async (postId) => {
        const result = await this.Post.findByPk(postId);
        return result
    }

    showAllcomment = async (postId) => {
        const result = await this.Comment.findAll({
            where: { PostId: postId },
            include: [{
                model: this.User,
                attributes:['nickname'],
            }]
        })
        return result
    }

    modifyComment = async (commentId, title, comment, userId) => {
        const result = await this.Comment.update({
            title: title,
            comment: comment
        }, {
            where: { commentId: commentId, UserId: userId }
        })
    }

    findComment = async (commentId) => {
        const result = await this.Comment.findByPk(commentId)
        return result
    }

    deleteComment = async (commentId,userId) => {
        const result = await this.Comment.destroy({
            where: { commentId: commentId, UserId:userId }
        })
        return result
    }
}

module.exports = CommentsRepository;