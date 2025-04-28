const express = require('express');
const { getUserSkins, getUserDetails, buySkin, updateEmail, updateUserPassword, changeBalance } = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authentication middleware to all routes in this router
router.use(authenticate);

router.get('/skins', getUserSkins);
router.get('/details', getUserDetails); 
router.post('/buy-skin', buySkin); 
router.post('/update-email', updateEmail);
router.post('/update-password',updateUserPassword);
router.post('/change-balance', changeBalance); // Assuming this is a POST request to change balance


module.exports = router;