const express = require('express');
const adminController = require('../controllers/admin-login.controller');
const router = express.Router();

// /create-admin POST TO CREATE NEW ADMIN
router.post('/create-admin', adminController.createAdmin);

// /login-admin POST TO AUTHENTICATE ADMIN
router.post('/login-admin', adminController.adminLogin);

module.exports = router;