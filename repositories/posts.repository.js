const { sequelize } = require('../models/index.js');


class PostsRepository {
    constructor(Post, User, Like) {
        this.Post = Post;
        this.User = User;
        this.Like = Like;
    }

    writePosts = async (userId, title, content) => {
        await this.Post.create({
            UserId: userId,
            title: title,
            content: content
        })
    }

    findAllPosts = async () => {
        const posts = await this.Post.findAll({
            attributes: [
                'postId',
                'UserId',
                'title',
                'content',
                'createdAt',
                'updatedAt',
                [sequelize.fn('COUNT', sequelize.col('Likes.PostId')), 'likes']
            ],
            include: [{
                model: this.User,
                attributes: ['nickname']
            },{
                model:this.Like
            }
        ]
        })
        return posts
    }
    findOnePosts = async (postId) => {
        const post = await this.Post.findByPk(postId);
        return post
    }

    modifyPosts = async (postId, title, content, userId) => {
        const result = await this.Post.update({
            title: title, content: content,
        }, {
            where: { postId: postId, UserId: userId }
        })

        return result
    }
    deletePosts = (postId, userId) => {
        const result = this.Post.destroy({
            where: { postId: postId, UserId: userId }
        })
        return result

    }

}

module.exports = PostsRepository;