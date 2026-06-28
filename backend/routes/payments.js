const express = require('express');
const router = express.Router();
const { createCheckoutSession, webhook, getPlans } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.route('/plans').get(getPlans);
router.route('/checkout').post(protect, createCheckoutSession);
router.route('/webhook').post(express.raw({ type: 'application/json' }), webhook);

module.exports = router;
