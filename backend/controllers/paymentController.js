const User = require('../models/User');

// Plan definitions
const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    credits: 10,
    features: [
      '10 credits per month',
      'Basic styles',
      'Standard quality',
      'Community support',
      'Watermarked images',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19,
    credits: 100,
    features: [
      '100 credits per month',
      'All art styles',
      'HD quality',
      'Priority generation',
      'No watermarks',
      'Email support',
      'Commercial license',
      'API access (1K requests/month)',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    credits: -1, // Unlimited
    features: [
      'Unlimited credits',
      'All art styles',
      '4K quality',
      'Priority generation',
      'No watermarks',
      'Dedicated support',
      'Commercial license',
      'Unlimited API access',
      'Custom styles',
      'Team collaboration',
    ],
  },
];

// @desc    Get all plans
// @route   GET /api/payments/plans
// @access  Public
exports.getPlans = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create checkout session
// @route   POST /api/payments/checkout
// @access  Private
exports.createCheckoutSession = async (req, res, next) => {
  try {
    const { planId } = req.body;

    const plan = plans.find(p => p.id === planId);

    if (!plan) {
      return res.status(400).json({
        success: false,
        message: 'Invalid plan',
      });
    }

    if (plan.price === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot checkout free plan',
      });
    }

    // TODO: Integrate with Stripe or other payment provider
    // For now, we'll simulate a checkout session
    
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Simulate successful payment
    user.plan = plan.id;
    if (plan.credits === -1) {
      user.credits = -1; // Unlimited
    } else {
      user.credits += plan.credits;
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Payment successful',
      data: {
        plan: user.plan,
        credits: user.credits,
      },
    });

    // In production, create Stripe checkout session:
    /*
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: user.email,
      client_reference_id: user._id.toString(),
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${plan.name} Plan`,
              description: `${plan.credits} credits per month`,
            },
            unit_amount: plan.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user._id.toString(),
        planId: plan.id,
      },
      success_url: `${process.env.CLIENT_URL}/dashboard?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/pricing?canceled=true`,
    });

    res.status(200).json({
      success: true,
      data: {
        sessionId: session.id,
        url: session.url,
      },
    });
    */
  } catch (error) {
    next(error);
  }
};

// @desc    Stripe webhook
// @route   POST /api/payments/webhook
// @access  Public
exports.webhook = async (req, res, next) => {
  try {
    // TODO: Verify Stripe webhook signature
    // In production, verify the signature using Stripe SDK

    const event = req.body;

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        // Handle successful payment
        console.log('Payment successful:', session);
        break;
      
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        // Handle subscription update
        console.log('Subscription updated:', subscription);
        break;
      
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object;
        // Handle subscription deletion
        console.log('Subscription deleted:', deletedSubscription);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({
      success: true,
      received: true,
    });
  } catch (error) {
    next(error);
  }
};
