import { Link } from 'react-router-dom';

function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Great for trying image and video generation',
      badge: 'Starter',
      features: [
        '10 image credits per month',
        '3 video generations per month',
        'Basic styles and formats',
        'Community support',
      ],
      cta: 'Get started free',
      ctaLink: '/signup',
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$9',
      description: 'For creators who want faster results',
      badge: 'Most popular',
      features: [
        '100 image credits per month',
        '20 video generations per month',
        'HD exports and premium styles',
        'Priority generation queue',
      ],
      cta: 'Choose Pro',
      ctaLink: '/signup',
      highlight: true,
    },
    {
      name: 'Studio',
      price: '$29',
      description: 'For teams and frequent content production',
      badge: 'For brands',
      features: [
        'Unlimited image generation',
        'Unlimited short video ideas',
        'Advanced formats and batch creation',
        'Dedicated support',
      ],
      cta: 'Contact sales',
      ctaLink: '/contact',
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Pricing for image and video creation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Start free, then upgrade when you want more speed, quality, and creative control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 ${plan.highlight ? 'border-blue-500 shadow-xl scale-[1.02] bg-white dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/80'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${plan.highlight ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}>
                  {plan.badge}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">/ month</span>
              </div>
              <Link
                to={plan.ctaLink}
                className={`mb-6 block w-full rounded-xl px-4 py-3 text-center font-semibold transition ${plan.highlight ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90' : 'border border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-200'}`}
              >
                {plan.cta}
              </Link>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Does the Free plan include video generation?</h3>
              <p className="text-gray-600 dark:text-gray-400">Yes. You can try text-to-video generation with a limited number of free credits each month.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can I upgrade later?</h3>
              <p className="text-gray-600 dark:text-gray-400">Absolutely. You can move from Free to Pro or Studio whenever you need more output and faster delivery.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Do I own the generated content?</h3>
              <p className="text-gray-600 dark:text-gray-400">Yes. You can use your generated images and videos for your own projects and marketing needs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
