const express = require('express');
const router = express.Router();

const signupRouter = require('./signup.js');
const loginRouter = require('./login.js');
const postsRouter = require('./posts.js');


router.get('/',(req,res)=>{
    res.send('연결되었습니다');
})
router.use('/signup',signupRouter);
router.use('/login',loginRouter);
router.use('/posts',postsRouter);

module.exports = router;