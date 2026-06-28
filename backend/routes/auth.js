const express = require('express');
const router = express.Router();
const { register, login, logout, forgotPassword, resetPassword, updateDetails, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);

// Protected routes
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);

module.exports = router;
