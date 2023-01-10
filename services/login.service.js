const LoginRepository = require('../repositories/login.repository.js');
const { User } = require('../models/index.js')
const { RefToken } = require('../models/index.js')

require('dotenv').config();
const jwt = require("jsonwebtoken");


class LoginService {
    constructor() {
        this.loginRepository = new LoginRepository(User, RefToken);
    }

    login = async (nickname, password) => {

        const user = await this.loginRepository.findUser(nickname, password);
        
        if (user.length) {//닉네임과 비번이 맞으면
            const userId = JSON.parse(JSON.stringify(user))[0].userId;
            console.log(userId)
            const accessToken = jwt.sign(
                {userId:userId},
                process.env.SECRET_KEY,
                {
                    expiresIn:'10s',
                }
            )
            const refreshToken = jwt.sign(
                {},
                process.env.SECRET_KEY,
                {
                    expiresIn:'10m'
                }
            )
            await this.loginRepository.refTokenSave(refreshToken,userId)

            return {
                accessToken: accessToken,
                refreshToken: refreshToken,
                status: 200,
                message: "로그인성공"
            }
        }else {
            return{
                status:400,
                message:"아이디 비밀번호가 틀렸습니다"
            }
        }
    }
}

module.exports = LoginService;