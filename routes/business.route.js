const express = require('express');
const knexConfig = require('../app');
const businessController = require('../controllers/business.controller');
const router = express.Router();

// /business - GET BUSINESS USING ID
router.get('/business/:id', (req, res) => { businessController.getBusiness(req, res, knexConfig.knex)} );

// /location - GET BUSINESS LOCATION USING ID
router.get('/location/:id', (req, res) => { businessController.getBusinessLocation(req, res, knexConfig.knex)} );

// /location - GET BUSINESS ADDRESS USING ID
router.get('/address/:id', (req, res) => { businessController.getBusinessAddress(req, res, knexConfig.knex)} );

// /business-owner - GET BUSINESS OWNER DETAILS USING ID
router.get('/owner/:id', (req, res) => { businessController.getBusinessOwner(req, res, knexConfig.knex)} );

// /business-tag - GET BUSINESS TAG DETAILS USING ID
router.get('/tag/:id', (req, res) => { businessController.getBusinessTag(req, res, knexConfig.knex)} );

// /business - POST TO CREATE A NEW BUSINESS
router.post('/business', (req, res) => { businessController.registerBusiness(req, res, knexConfig.knex)} );

// /update/business-details/ - PUT TO UPDATE A BUSINESS
router.put('/update/business-details/:id', (req, res) => { businessController.updateBusiness(req, res, knexConfig.knex)} );

// /update/coord/ - PUT TO UPDATE A BUSINESS COORDINATES
router.put('/update/coord/:id', (req, res) => { businessController.updateBusinessCoordinates(req, res, knexConfig.knex)} );

// /update/owner/ - PUT TO UPDATE A BUSINESS OWNER
router.put('/update/owner/:id', (req, res) => { businessController.updateBusinessOwner(req, res, knexConfig.knex)} );

// /update/tag/ - PUT TO UPDATE A BUSINESS TAGS
router.put('/update/tag/:id', (req, res) => { businessController.updateBusinessTag(req, res, knexConfig.knex)} );

// /update/address/ - PUT TO UPDATE A BUSINESS  ADDRESS
router.put('/update/address/:id', (req, res) => { businessController.updateBusinessAddress(req, res, knexConfig.knex)} );

// / - GET ALL BUSINESSES
router.get('/', (req, res) => { businessController.getAllBusiness(req, res, knexConfig.knex)} );

// /address - GET ALL BUSINESSE ADDRESSES
router.get('/address', (req, res) => { businessController.getAllBusinessAddress(req, res, knexConfig.knex)} );

// /owner - GET ALL BUSINESSES OWNER
router.get('/owner', (req, res) => { businessController.getAllBusinessOwner(req, res, knexConfig.knex)} );

// /coord - GET ALL BUSINESSE COORDINATES
router.get('/coord', (req, res) => { businessController.getAllBusinessCoords(req, res, knexConfig.knex)} );

// /tag - GET ALL BUSINESSES TAGS
router.get('/tag', (req, res) => { businessController.getAllBusinessTag(req, res, knexConfig.knex)} );

module.exports = router;

