const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [];
let generatedImages = [];
let nextUserId = 1;

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const user = {
      id: nextUserId++,
      name,
      email,
      password,
      role: 'user',
      plan: 'free',
      credits: 10,
      createdAt: new Date(),
    };
    users.push(user);
    res.status(200).json({
      success: true,
      token: 'demo-jwt-token-' + user.id,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        plan: user.plan,
        credits: user.credits,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = users.find(u => u.email === email);
    if (!user) {
      user = {
        id: nextUserId++,
        name: email.split('@')[0],
        email,
        password,
        role: 'user',
        plan: 'free',
        credits: 10,
        createdAt: new Date(),
      };
      users.push(user);
    }
    res.status(200).json({
      success: true,
      token: 'demo-jwt-token-' + user.id,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        plan: user.plan,
        credits: user.credits,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/auth/me', (req, res) => {
  res.status(200).json({ success: true, data: null });
});

app.post('/api/auth/logout', (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

app.post('/api/auth/forgotpassword', (req, res) => {
  res.status(200).json({ success: true, message: 'Password reset email sent (demo)' });
});

app.post('/api/images', async (req, res) => {
  try {
    const { prompt, style, aspectRatio } = req.body;
    
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid prompt is required'
      });
    }

    const ratioMap = {
      '1:1': '1024x1024',
      '16:9': '1792x1024',
      '9:16': '1024x1792',
      '4:5': '896x1120',
    };
    const size = ratioMap[aspectRatio] || '1024x1024';

    const stylePrompts = {
      realistic: 'photorealistic, high detail, sharp focus, 8k',
      anime: 'anime style, vibrant colors, detailed artwork',
      '3d': '3d render, cinematic lighting, blender style',
      cartoon: 'cartoon style, cel shaded, flat colors',
      digital: 'digital art, detailed, painterly',
      fantasy: 'fantasy style, epic, magical, detailed',
    };
    
    const enhancedPrompt = `${prompt}, ${stylePrompts[style] || 'high quality'}`;

    console.log(`🎨 Generating: "${prompt}"`);

    const generatedImgs = [];
    const seed = Date.now();
    
    for (let i = 0; i < 4; i++) {
      const img = {
        id: 'img-' + seed + '-' + i,
        url: `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=${size.split('x')[0]}&height=${size.split('x')[1]}&nologo=true&seed=${seed + i}`,
        prompt,
        style,
        aspectRatio,
        createdAt: new Date(),
      };
      generatedImgs.push(img);
      generatedImages.push(img);
    }

    console.log(`✅ Generated ${generatedImgs.length} images!`);

    res.status(200).json({
      success: true,
      data: {
        images: generatedImgs,
        remainingCredits: 10,
      },
    });

  } catch (error) {
    console.error('❌ Generation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate image',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

app.get('/api/images/my-images', (req, res) => {
  res.status(200).json({ success: true, data: generatedImages });
});

const plans = [
  { id: 'free', name: 'Free', price: 0, credits: 10, features: ['10 credits per month', 'All styles', 'All aspect ratios'] },
];

app.get('/api/payments/plans', (req, res) => {
  res.status(200).json({ success: true, data: plans });
});

app.post('/api/payments/checkout', (req, res) => {
  res.status(200).json({ success: true, message: 'Payment successful (demo)' });
});

app.post('/api/payments/webhook', (req, res) => {
  res.status(200).json({ success: true, received: true });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    aiProvider: 'Pollinations AI (free)',
    apiKeyRequired: false,
  });
});

app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎨 AI Provider: Pollinations AI (FREE & no API key needed!)`);
});

process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', err);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
