const express = require('express');
const adminController = require('../controllers/admin-login.controller');
const cors = require('cors');
const corsConfig = require('../app');
const router = express.Router();

// const whitelist = ["https://the-market-place.vercel.app/", "http://localhost:3001"]

// /create-admin POST TO CREATE NEW ADMIN
router.post('/create-admin', cors(corsConfig.corsOptionsDelegate),adminController.createAdmin);

// /login-admin POST TO AUTHENTICATE ADMIN
router.post('/login-admin', cors(corsConfig.corsOptionsDelegate), adminController.adminLogin);

module.exports = router;