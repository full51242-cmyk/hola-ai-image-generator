const User = require('../models/User');

// Placeholder for image storage (in production, use a database)
const generatedImages = [];

// @desc    Generate image
// @route   POST /api/images
// @access  Private
exports.generateImage = async (req, res, next) => {
  try {
    const { prompt, style, aspectRatio, count } = req.body;

    // Validate request
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required',
      });
    }

    // Get user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check credits
    const imageCount = count || 1;
    if (user.credits < imageCount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient credits',
      });
    }

    // Deduct credits
    user.credits -= imageCount;
    await user.save();

    // TODO: Integrate with actual AI image generation API
    // For now, we'll create placeholder images
    const images = [];
    for (let i = 0; i < imageCount; i++) {
      const imageData = {
        id: `img_${Date.now()}_${i}`,
        url: `https://picsum.photos/800/600?random=${Date.now() + i}`,
        prompt,
        style: style || 'realistic',
        aspectRatio: aspectRatio || '1:1',
        userId: user._id,
        createdAt: new Date(),
      };
      
      generatedImages.push(imageData);
      images.push(imageData);
    }

    res.status(200).json({
      success: true,
      data: {
        images,
        remainingCredits: user.credits,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my generated images
// @route   GET /api/images/my-images
// @access  Private
exports.getMyImages = async (req, res, next) => {
  try {
    const myImages = generatedImages.filter(img => img.userId.toString() === req.user.id);

    res.status(200).json({
      success: true,
      count: myImages.length,
      data: myImages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all images (admin)
// @route   GET /api/images
// @access  Private/Admin
exports.getAllImages = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      count: generatedImages.length,
      data: generatedImages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete image
// @route   DELETE /api/images/:id
// @access  Private
exports.deleteImage = async (req, res, next) => {
  try {
    const imageIndex = generatedImages.findIndex(
      img => img.id === req.params.id && img.userId.toString() === req.user.id
    );

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Image not found or you do not have permission to delete it',
      });
    }

    generatedImages.splice(imageIndex, 1);

    res.status(200).json({
      success: true,
      message: 'Image deleted',
    });
  } catch (error) {
    next(error);
  }
};
