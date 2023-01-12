const { sequelize } = require("../models");

class LikeRepository {
    constructor(User, Post, Like) {
        this.Like = Like;
        this.User = User;
        this.Post = Post;
    }
    findlike = async (postId, userId) => {
        const result = await this.Like.findAll({
            where: { PostId: postId,UserId:userId }
        })
        return result;
    }

    createLike = async (postId, userId) => {
        const result = await this.Like.create({
            PostId: postId,
            UserId: userId
        })
        return result;
    };

    deleteLike = async (postId, userId) => {
        const result = await this.Like.destroy({
            where: { PostId: postId, UserId: userId }
        })
        return result;
    }
    findPost = async (postId) => {
        const result = await this.Post.findByPk(postId)
        return result
    }

    findLikedPost = async (userId) => {
        const result = await this.Like.findAll({
            where:{UserId:userId},
            include: [{
                model: this.Post,
                attributes: ['postId','UserId', 'title', 'content','createdAt', 'updatedAt'],
                include:[{
                    model:this.Like,
                    attributes:['UserId'],
                    required:false
                }]
            }]
        })
        return result
    }

}

module.exports = LikeRepository


