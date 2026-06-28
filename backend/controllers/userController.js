const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Make sure user is viewing their own profile or is admin
    if (user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this user',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Make sure user is updating their own profile or is admin
    if (user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this user',
      });
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user credits
// @route   PUT /api/users/:id/credits
// @access  Private/Admin
exports.updateCredits = async (req, res, next) => {
  try {
    const { credits, action } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (action === 'add') {
      user.credits += credits;
    } else if (action === 'deduct') {
      if (user.credits < credits) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient credits',
        });
      }
      user.credits -= credits;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid action',
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        credits: user.credits,
      },
    });
  } catch (error) {
    next(error);
  }
};
