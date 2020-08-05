const express = require('express');
const knexConfig = require('../app');
const adminController = require('../controllers/admin-login.controller');
const router = express.Router();

// /create-admin POST TO CREATE NEW ADMIN
router.post('/create-admin', (req, res) => { adminController.createAdmin(req, res, knexConfig.knex)} );

// /login-admin POST TO AUTHENTICATE ADMIN
router.post('/login-admin', (req, res) => { 
  // console.log(knexConfig.knex)
  adminController.adminLogin(req, res, knexConfig.knex)} );

module.exports = router;