//const { User } = require('../models/index.js');
//const user = require('../models/user.js');

class SignupRepository{
    constructor(User){
        this.User = User
    }


    findUser = async (nickname) =>{
     const user = await this.User.findAll({
        where:{nickname:nickname}
     })
     return user;
    }


    createUser = async (nickname,password)=>{
        await this.User.create({
            nickname:nickname,
            password:password
        });
        
    }
    
}

module.exports = SignupRepository;