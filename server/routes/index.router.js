const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const searchController = require('../controllers/google_search.controller');
const musicController = require('../controllers/music.controller');
const noteController = require('../controllers/note.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post('/search/', jwtHelper.verifyJwtToken, searchController.search);
router.post('/topnews',jwtHelper.verifyJwtToken, searchController.topnews);
router.get('/music/:parameter',jwtHelper.verifyJwtToken, musicController.searchTracks);
router.get('/note',jwtHelper.verifyJwtToken, noteController.getP);
router.post('/note',jwtHelper.verifyJwtToken, noteController.postP);

module.exports = router;



