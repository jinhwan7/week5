const PostsService = require('../services/posts.service.js');



class PostsController {
    constructor() {
        this.postsService = new PostsService()
    }

    writePosts = async (req,res,next) => {
       const{ title, content } = req.body
        result = await this.postsService.writePosts( title, content )
        return res.status(result.status).json({message: result.message})
    }

    showAllPosts = async(req,res,next) => {
        result = await this.postsService.showAllPosts()
        return res.status(result.status).json({message: result.message, data:result.data})
    }

    showDetailPosts = async(req,res,next) => {
        const postId = req.params
        result = await this.postsService.showDetailPosts( postId )
        return res.status(result.status).json({message: result.message, data:result.data})
    }

    modifyPosts = async (req,res,next) => {
        const postId = req.params
        result = await this.postsService.modifyPosts(postId)
        return res.status(result.status).json({message: result.message})
    }

    deletPosts = async (req,res,next) => {
        const postId = req.params
        result = await this.postsService.deletPosts(postId)
        return res.status(result.status).json({message: result.message})
    }
}

module.exports = PostsController;