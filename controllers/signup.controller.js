const SignupService = require('../services/signup.service.js');
 
class SignupController{

    constructor(){
        this.signupService = new SignupService();
    }

    signup = async (req,res,next)=>{
        const { nickname, password, confirm } =  req.body;
        const createdUser = await this.signupService.createUser(nickname,password,confirm);
        return res.status(200).json({message:"회원가입에 성공했습니다"});
    }
}

module.exports = SignupController;