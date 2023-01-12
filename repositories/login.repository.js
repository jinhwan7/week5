class LoginRepository{
    constructor(User,RefToken){
        this.User = User;
        this.RefToken = RefToken;
    }

    findUser = async ( nickname) => {
        const user =  await this.User.findOne({
            where:{ nickname:nickname }
        })
        return user
    }

    refTokenSave = async(refreshToken,userId) => {
        await this.RefToken.create({
            refreshToken: refreshToken,
            userId: userId
        })
    }
}

module.exports = LoginRepository;