const LoginService = require('../services/login.service.js');

class LoginController{
    
    constructor(){
        this.loginService = new LoginService();
    }

    login = async ( req, res, next )=>{

        const { nickname,password } = req.body;

        const result = await this.loginService.login(nickname,password);
        res.cookie('Athorization',`Bearer ${ result.accessToken }`)
        res.cookie('refresh',result.refreshToken)
        res.status(result.status).json({token: result.accessToken})
    }

    

}

module.exports = LoginController;