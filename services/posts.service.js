const PostsRepository = require('../repositories/posts.repository.js');
const { Post } = require('../models/index.js');
const { User } = require('../models/index.js');
const { post } = require('../routes/signup.js');
class PostsService {
    constructor() {
        this.postsRepository = new PostsRepository(Post, User);

    }
    writePosts = async (userId, title, content) => {
        
        const posts = await this.postsRepository.writePosts(userId, title, content);
        
        return {
            status: 200,
            message: "게시글을 작성하였습니다",
            data: posts
        }
    }

    showAllPosts = async () => {
        const result = await this.postsRepository.findAllPosts();
        
        const posts = JSON.parse(JSON.stringify(result));
        console.log(posts);
        if (posts.length === 0) {
            return {
                status: 404,
                message: "게시글이 없습니다",
            }
        }
        const re_posts = posts.map((post) => {
            return {
                postId: post.postId,
                UserId: post.UserId,
                nickname: post.User.nickname,
                title: post.title,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
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

    modifyPosts = async (postId, title, content) => {
        const posts = await this.postsRepository.modifyPosts(postId, title, content);
        return {
            status: 200,
            message: "게시글 수정 완료",
            data: posts
        }
    }

    deletPosts = async (postId) => {
        const posts = await this.postsRepository.modifyPosts(postId);

        return {
            status: 200,
            message: "게시글 삭제 완료",
            data: posts
        }
    }
}

module.exports = PostsService;