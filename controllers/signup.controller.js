const SignupService = require('../services/signup.service.js');
 
class SignupController{

    constructor(){
        this.signupService = new SignupService();
    }

    signup = async (req,res,next)=>{
        const { nickname, password, confirm } =  req.body;
        const result = await this.signupService.createUser(nickname,password,confirm);

        return res.status(result.status).json({message:result.message});  
    }
}

module.exports = SignupController;