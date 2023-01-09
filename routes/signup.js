const express = require('express');
const router = express.Router();

const SignupController = require('../controllers/signup.controller.js');
const signupController = new SignupController();

//회원가입
router.post('/', signupController.signup);



module.exports = router;