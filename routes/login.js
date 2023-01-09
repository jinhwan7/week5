const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/login.controller.js');


router.post('/',loginController.login);

module.exports = router;