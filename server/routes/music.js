const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const searchController = require('../controllers/google_search.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/search/', searchController.search);
router.get('/topnews/:location', searchController.topnews);


module.exports = router;
