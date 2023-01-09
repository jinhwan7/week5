const LoginService = require('../services/login.service.js');

class LoginController{
    
    constructor(){
        this.loginService = new LoginService();
    }

    login = async (req,res,next)=>{
        const { nickname,password } = req.body;

        const result = await this.loginService.findUser();
        
        res.status(result.status).json({message:result.message})
    }

    

}

module.exports = LoginController;