const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts.controller.js');
const postsController = new PostsController();
const validToken = require('../middleware/validToken.js')

//게시글 작성
router.post('/',validToken ,postsController.writePosts);


//게시글 전체조회
router.get('/', postsController.showAllPosts);


//게시글 상세조회
router.get('/:postId', postsController.showDetailPosts);


//게시글 수정
router.put('/:postId',validToken, postsController.modifyPosts);


//게시글 삭제
router.delete('/:postId',validToken, postsController.deletPosts)

module.exports = router;