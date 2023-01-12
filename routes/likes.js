const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/likes.controller.js');
const likeController = new LikeController();
const validToken = require('../middleware/validToken.js');


//로그인되 사용자가 좋아요한 게시글 조회
router.get('/like',validToken,likeController.showLikedPost)

//좋아요발생시키기
router.put('/:postId/like',validToken, likeController.likeEvent)

module.exports = router;