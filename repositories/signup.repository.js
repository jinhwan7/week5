//const { User } = require('../models/index.js');
//const user = require('../models/user.js');

class SignupRepository{
    constructor(User){
        this.User = User
    }
    createUser = async ()=>{
        await this.User.create({
            nickname:nickname,
            password:password
        })
    }
    
}

module.exports = SignupRepository;