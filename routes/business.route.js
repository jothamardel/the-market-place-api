const express = require('express');
const businessController = require('../controllers/business.controller');
const router = express.Router();

// /address - GET ALL BUSINESSES
router.get('/', businessController.getAllBusiness);

// // /business - GET BUSINESS USING ID
router.get('/business/:id', businessController.getBusinessById);

// /business - POST TO CREATE A NEW BUSINESS
router.post('/business', businessController.registerBusiness);
  

module.exports = router;

