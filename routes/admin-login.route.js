const express = require('express');
const adminController = require('../controllers/admin-login.controller');
const cors = require('cors');
const corsConfig = require('../app');
const router = express.Router();

// const whitelist = ["https://the-market-place.vercel.app/", "http://localhost:3001", "http://localhost:3000"]

// /create-admin POST TO CREATE NEW ADMIN
router.options('/create-admin', adminController.createAdmin);

// /login-admin POST TO AUTHENTICATE ADMIN
router.options('/login-admin', adminController.adminLogin);

module.exports = router;