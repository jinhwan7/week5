const PostsService = require('../services/posts.service.js');



class PostsController {
    constructor() {
        this.postsService = new PostsService()
    }

    writePosts = async (req, res, next) => {
        const userId = res.locals.userId;
        const { title, content } = req.body
        const result = await this.postsService.writePosts(userId, title, content)
        return res.status(result.status).json({ message: result.message })
    }

    showAllPosts = async (req, res, next) => {
        const result = await this.postsService.showAllPosts()
        return res.status(result.status).json({ message: result.message, data: result.data })
    }

    showDetailPosts = async (req, res, next) => {
        const { postId } = req.params
        const result = await this.postsService.showDetailPosts(postId)
        return res.status(result.status).json({ message: result.message, data: result.data })
    }

    modifyPosts = async (req, res, next) => {
        const { postId } = req.params
        const { title, content } = req.body
        const userId = res.locals.userId;
        const result = await this.postsService.modifyPosts(postId, title, content,userId)
        return res.status(result.status).json({ message: result.message })
    }

    deletPosts = async (req, res, next) => {
        const userId = res.locals.userId
        const { postId } = req.params
        const result = await this.postsService.deletePosts(postId,userId)
        return res.status(result.status).json({ message: result.message })
    }
}

module.exports = PostsController;