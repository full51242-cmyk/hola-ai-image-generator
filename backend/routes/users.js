const express = require('express');
const router = express.Router();
const { getUsers, getUser, updateUser, deleteUser, updateCredits } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

// Admin only routes
router.route('/')
  .get(authorize('admin'), getUsers);

router.route('/:id')
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(authorize('admin'), deleteUser);

router.put('/:id/credits', authorize('admin'), updateCredits);

module.exports = router;
