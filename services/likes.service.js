const LikeRepository = require('../repositories/likes.repository.js')
const { User, Post, Like } = require('../models/index.js');

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository(User, Post, Like);
    }

    likeEvent = async (postId, userId) => {
        
        const existPost = await this.likeRepository.findPost(postId)
        
        if (!existPost) {
            return {
                status: 404,
                message: "없는 게시글 입니다"
            }
        }

        const existLike = await this.likeRepository.findlike(postId, userId)
        if (!existLike.length) {
            const result = await this.likeRepository.createLike(postId, userId)
            return {
                status: 200,
                message: "좋아요등록"
            }
        } else {
            const result = await this.likeRepository.deleteLike(postId, userId)
            return {
                status: 200,
                message: "좋아요취소"
            }
        }
    }

    showLikedPost = async (userId)=>{
        const result = await this.likeRepository.findLikedPost(userId);
        const parseResult = JSON.parse(JSON.stringify(result))
        
        //console.log(parseResult)
        // const likes = parseResult.Post.Likes
        //console.log(parseResult[0].Post.Likes)
        const mapingResult = parseResult.map( value => {
            return{ postId:value.Post.postId,
                   userId:value.Post.UserId,
                   title: value.Post.title,
                   createdAt:value.Post.createdAt,
                   updatedAt:value.Post.updatedAt,
                   likes:value.Post.Likes.length
            }
        })

        //console.log( mapingResult);
        return {
            status: 200,
            message: "내가 좋아요한 게시글 목록",
            data:mapingResult
        }
    }
}


module.exports = LikeService