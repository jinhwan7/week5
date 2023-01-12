const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controller.js')
const commentsController = new CommentsController();
const validToken = require('../middleware/validToken.js');

//댓글 작성
router.post('/:postId',validToken,commentsController.writeComment);


//댓글 목록 조회
router.get('/:postId',commentsController.showAllComment);



//댓글 수정
router.put('/:commentId',validToken,commentsController.modifyComment);


//댓글 삭제
router.delete('/:commentId',validToken,commentsController.deleteComment);

module.exports = router;

