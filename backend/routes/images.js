const express = require('express');
const router = express.Router();
const { generateImage, getMyImages, getAllImages, deleteImage } = require('../controllers/imageController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .post(generateImage)
  .get(authorize('admin'), getAllImages);

router.route('/my-images')
  .get(getMyImages);

router.route('/:id')
  .delete(deleteImage);

module.exports = router;
