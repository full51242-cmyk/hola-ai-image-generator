import { Link } from 'react-router-dom';

function PricingPage() {
  const freePlan = {
    name: 'Free',
    description: 'Everything you need to get started',
    features: [
      '10 credits per month',
      'Multiple art styles (Realistic, Anime, 3D, Cartoon, Digital Art, Fantasy)',
      'Standard quality',
      'Community support',
      'Unlimited downloads',
      'Custom aspect ratios',
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Free Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            All features completely free
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="flex justify-center">
          <div className="card p-8 border-2 border-primary-500 scale-100 max-w-md w-full">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {freePlan.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {freePlan.description}
              </p>
            </div>

            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  $0
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">
                  forever
                </span>
              </div>
            </div>

            <Link
              to="/signup"
              className="btn-primary w-full block text-center"
            >
              Get Started Free
            </Link>

            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                What's included:
              </h4>
              <ul className="space-y-3">
                {freePlan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2 text-lg">✓</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Is everything really free?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! Landscope is completely free with all features included. No credit card required.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                How many images can I generate?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You get 10 free credits every month. Each image generation costs 1 credit.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Can I use the images commercially?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! You own all rights to the images you generate. Feel free to use them for any project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
