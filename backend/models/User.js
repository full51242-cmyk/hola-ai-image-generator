const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  plan: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    default: 'free',
  },
  credits: {
    type: Number,
    default: 10,
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  emailVerificationToken: String,
  emailVerified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  // Set expire time (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
  return resetToken;
};

// Generate email verification token
userSchema.methods.getEmailVerificationToken = function() {
  const verifyToken = crypto.randomBytes(20).toString('hex');
  
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verifyToken)
    .digest('hex');
  
  return verifyToken;
};

// Add credits to user
userSchema.methods.addCredits = function(amount) {
  this.credits += amount;
  return this.save();
};

// Deduct credits from user
userSchema.methods.deductCredits = function(amount) {
  if (this.credits >= amount) {
    this.credits -= amount;
    return this.save();
  }
  return false;
};

module.exports = mongoose.model('User', userSchema);
