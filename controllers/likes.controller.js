const LikeService = require('../services/likes.service.js');


class LikeController {
    constructor() {
        this.likeService = new LikeService()
    }


    likeEvent = async (req, res, next) => {
        const { postId } = req.params
        const userId = res.locals.userId

        const result = await this.likeService.likeEvent(postId, userId)
        res.status(result.status).json({ message: result.message, data: result.data })
    }

    
    showLikedPost = async (req, res, next) => {
        const userId = res.locals.userId
        const result = await this.likeService.showLikedPost(userId);
        res.status(result.status).json({ message: result.message, data: result.data })
    }
}

module.exports = LikeController