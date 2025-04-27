const express = require('express');
const { getUserSkins, getUserDetails } = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authentication middleware to all routes in this router
router.use(authenticate);

router.get('/skins', getUserSkins);
router.get('/details', getUserDetails); // Assuming you have a getUserDetails function in your controller

module.exports = router;