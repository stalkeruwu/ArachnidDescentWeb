const express = require('express');
const { registerUser, loginUser, verifyEmail, forgotPassword, resetPassword,checkTokenValidity } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/check-token', checkTokenValidity); // New route for token validation


module.exports = router;