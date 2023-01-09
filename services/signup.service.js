const SignupRepository = require('../repositories/signup.repository.js');
const { User } = require('../models/index.js');

class SignupService{
    
    constructor(){
        this.signuprepository = new SignupRepository(User);
    }
    
    createUser = async (nickname, password, confirm)=>{
        
        const createdUser = await this.signuprepository.createUser(nickname,password);
        return createdUser;


    }
}
module.exports = SignupService;