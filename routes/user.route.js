const express = require('express');
const userController = require('../controllers/create-user.controller');
const router = express.Router();


// /create-admin POST TO CREATE NEW ADMIN
router.post('/create-user', userController.createNewUser);

// /login-admin POST TO AUTHENTICATE ADMIN
router.post('/login-user', userController.loginUser);

module.exports = router;