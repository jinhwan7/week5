const jwt = require('jsonwebtoken');
require('dotenv').config();
const { RefToken } = require('../models/index.js');

module.exports = async (req, res, next) => {
    const { Authorization } = req.cookies;

    const [authType, authToken] = (Authorization || "").split(" ");
    if (!authToken || authType !== "Bearer") {
        res.status(401).send({
            errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
        return;
    }

    const { refresh } = req.cookies;

    try {
        jwt.verify(refresh, process.env.SECRET_KEY);
        try {
            const { userId } = jwt.verify(authToken, process.env.SECRET_KEY);
            res.locals.userId = userId
            console.log('토큰검증완료');
            next();
        } catch {
            let userId = await RefToken.findAll({
                attributes: ['UserId'],
                where: { refreshToken: refresh }
            });
            if(!userId.length){return res.status(400).send({message:"다시 로그인해야합니다."})}
            userId = JSON.parse(JSON.stringify(userId))[0].UserId
            console.log("userId: ",userId);
            const accessToken = jwt.sign(
                                    { userId: userId },
                                    process.env.SECRET_KEY,
                                    {
                                        expiresIn: '10s',
                                    }
                                )
            res.cookie('Authorization',`Bearer ${ accessToken }`);
            res.locals.userId = userId
            console.log('토큰만료로 재발급');
            next();
        }

    } catch(err) {
        console.log(err);
        res.status(400).send({message:"다시 로그인해 주세요"});

    }









    // try {
    //     jwt.verify(refresh, SECRET_KEY)
    //     try {
    //         const { userId } = jwt.verify(authToken, SECRET_KEY);
    //         res.locals.userId = userId;
    //         next();

    //     } catch (err) {

    //         let  userId  = await refToken.findOne({
    //             attributes: ['userId'],
    //             where: {
    //                 refreshToken: refresh,
    //             },
    //         });
    //         userId = userId.dataValues.userId
    //         const accessToken = jwt.sign(
    //             { "userId": userId },
    //             SECRET_KEY,
    //             {
    //                 expiresIn: '10s'
    //             });
    //         res.cookie('Authorization', `Bearer ${accessToken}`);
    //         console.log('엑세스쿠키재발급')
    //         res.locals.userId = userId;
    //         next();
    //     }
    // } catch(err) {
    //     console.log(err);
    //     res.status(401).send({
    //         errorMessage: "다시 로그인해주세요.refresh토큰 만료",
    //     });
    // }
}