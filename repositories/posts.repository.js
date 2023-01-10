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

    modifyPosts = async( postId, title, content, userId ) => {
       const result =  await this.Post.update({
            title: title, content: content,
        },{
            where:{postId:postId, UserId:userId}
        })
        
        return result
    }
    deletePosts = (postId,userId)=>{
        const result = this.Post.destroy({
            where:{postId:postId, UserId:userId}
        })
        return result

    }

}

module.exports = PostsRepository;