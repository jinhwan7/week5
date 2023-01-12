const PostsRepository = require('../repositories/posts.repository.js');
const { Post, User, Like } = require('../models/index.js');


const joi = require('joi');
const postSchema = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
})



class PostsService {
    constructor() {
        this.postsRepository = new PostsRepository(Post, User, Like);

    }
    writePosts = async (userId, title, content) => {
        const resultSchema = postSchema.validate({title,content});
        if(resultSchema.error){
            return {
                status:400,
                message:"데이터형식이 잘못되었습니다"
            }
        }
        
        const posts = await this.postsRepository.writePosts(userId, title, content);
        return {
            status: 200,
            message: "게시글을 작성하였습니다",
            data: posts
        }
    }

    showAllPosts = async () => {
        const result = await this.postsRepository.findAllPosts();
        if (result.length === 0) {
            return {
                status: 404,
                message: "게시글이 없습니다",
            }
        }
        const posts = JSON.parse(JSON.stringify(result));
        
        
        const re_posts = posts.map((post) => {
            return {
                postId: post.postId,
                UserId: post.UserId,
                nickname: post.User.nickname,
                title: post.title,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
                likes:post.likes
            }

        })
        return {
            status: 200,
            message: "전체 게시글 조회",
            data: re_posts
        }
    }

    showDetailPosts = async (postId) => {
        const result = await this.postsRepository.findOnePosts(postId);
        const post = JSON.parse(JSON.stringify(result))
        
        if (!post) {
            return {
                status: 404,
                message: "게시글이 없습니다",
            }
        }
        return {
            status: 200,
            message: "게시글 상세조회",
            data: post
        }
    }

    modifyPosts = async (postId, title, content,userId) => {

        const post = await this.postsRepository.findOnePosts(postId)
        if(post===null){
            return {
                status: 400,
                message: "게시글이 없습니다",
                
            }
        }
        const posts = await this.postsRepository.modifyPosts(postId, title, content, userId);
        if(posts[0] === 0 ){
            return {
                status: 400,
                message: "본인이 쓴 게시글만 수정이 가능합니다",
                data: posts
            }
        }
        return {
            status: 200,
            message: "게시글 수정 완료",
            data: posts
        }
    }

    deletePosts = async (postId, userId) => {
        const post = await this.postsRepository.findOnePosts(postId)
        if(post===null){
            return {
                status: 400,
                message: "게시글이 없습니다",      
            }
        }
        const posts = await this.postsRepository.deletePosts(postId, userId);
        if(posts === 0){
            return {
                status: 400,
                message: "본인이 쓴 게시글이 아닙니다",
            }
        }
        return {
            status: 200,
            message: "게시글 삭제 완료",
            data: posts
        }
    }
}

module.exports = PostsService;