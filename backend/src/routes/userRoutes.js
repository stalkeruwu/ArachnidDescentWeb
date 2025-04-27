const express = require('express');
const { getUserSkins } = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authentication middleware to all routes in this router
router.use(authenticate);

router.get('/skins', getUserSkins);

module.exports = router;