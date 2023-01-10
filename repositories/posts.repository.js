class PostsRepository {
    constructor(Post,User) {
        this.Post = Post;
        this.User = User;
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
            include:{
                model: this.User,
                attributes:['nickname']
            }
        })
        return posts
    }
    findOnePosts = async (postId)=>{
        const post = await this.Post.findByPk(postId);
        return post
    }


}

module.exports = PostsRepository;