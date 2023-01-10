class LoginRepository{
    constructor(User,RefToken){
        this.User = User;
        this.RefToken = RefToken;
    }

    findUser = async ( nickname, password ) => {
        const user =  await this.User.findAll({
            where:{ nickname:nickname, password:password }
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