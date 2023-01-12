const LoginRepository = require('../repositories/login.repository.js');
const { User } = require('../models/index.js')
const { RefToken } = require('../models/index.js')
const bcrypt = require('bcrypt');

require('dotenv').config();
const jwt = require("jsonwebtoken");


class LoginService {
    constructor() {
        this.loginRepository = new LoginRepository(User, RefToken);
    }

    login = async (nickname, password) => {

        const user = JSON.parse(JSON.stringify(await this.loginRepository.findUser(nickname)))
        console.log(user)
        if (!user) {
            return {
                status: 400,
                message: "아이디 비밀번호가 틀렸습니다"
            }
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (validPassword) {

            const accessToken = jwt.sign(
                { userId: user.userId },
                process.env.SECRET_KEY,
                {
                    expiresIn: '10s',
                }
            );
            const refreshToken = jwt.sign(
                {},
                process.env.SECRET_KEY,
                {
                    expiresIn: '10m'
                }
            );
            await this.loginRepository.refTokenSave(refreshToken, user.userId)

            return {
                accessToken: accessToken,
                refreshToken: refreshToken,
                status: 200,
                message: "로그인성공"
            }

        } else {
            return {
                status: 400,
                message: "아이디 비밀번호가 틀렸습니다"
            }
        }
    }
}

module.exports = LoginService;