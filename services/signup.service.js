const SignupRepository = require('../repositories/signup.repository.js');
const { User } = require('../models/index.js');
const { rmSync } = require('fs');

class SignupService {
    constructor() {
        this.signupRepository = new SignupRepository(User);
    }
    createUser = async (nickname, password, confirm) => {
        if(password !== confirm){
            return {
                status:400,
                message:"비밀번호랑 비밀번호 확인이 다릅니다"
            }
        }
        const message = '';
        //입력값 형식 확인
        const regex_id = /^[A-z0-9]{3,}$/;
        const regex_pw = /^[A-Za-z0-9\`\~\!\@\#\$|%|^|&|*|(|)|_|+\-\=\{\}\[\]\,\.\/\?\;\'\:\"]{6,}$/;
        if (regex_id.test(nickname)===false) {    
            return {
                status:400, 
                message:"닉네임 형식이 틀렸습니다(알파벳,숫자로 3자이상)"       
            }
        }    
        if(regex_pw.test(password)===false){
            return {
                status:400, 
                message:"비밀번호 형식이 틀렸습니다(알파벳,숫자,특수문자 4자이상)"   
            }
        }

        const user = await this.signupRepository.findUser(nickname)
        if (user.length) {
            return {
                status:400, 
                message:"닉네임중복",   
            }
        }else{
            await this.signupRepository.createUser(nickname,password);
            return{
                status:200,
                message:"회원가입에 성공하였습니다"
            }
        }            
            
        
        


    }
}

module.exports = SignupService;