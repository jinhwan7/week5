const express = require('express');
const router = express.Router();

const signupRouter = require('./signup.js');


router.get('/',(req,res)=>{
    res.send('연결되었습니다');
})
//router.use('/signup',signupRouter);
//router.use('/',postRouter);

module.exports = router;