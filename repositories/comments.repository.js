class CommentsRepository{
    constructor(Comment){
        this.Comment = Comment
    }

    writeComment = async (title, comment, postId, userId) =>{
        const result = await this.Comment.create({
            PostId:postId,
            UserId:userId,
            title:title,
            comment:comment,
        });
        return result

    }
}

module.exports = CommentsRepository;