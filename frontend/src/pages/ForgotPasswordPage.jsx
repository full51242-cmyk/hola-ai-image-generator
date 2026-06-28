import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!email) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {submitted ? (
          <div className="card p-8 text-center">
            <div className="text-6xl mb-4">📧</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Check Your Email
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and spam folder.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              The link will expire in 24 hours.
            </p>
            <Link to="/login" className="btn-primary inline-block">
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔑</div>
              <h1 className="text-4xl font-bold text-gradient mb-2">
                Forgot Password?
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                No worries, we'll send you reset instructions
              </p>
            </div>

            <div className="card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className="input-field"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>

              {/* Back to Login */}
              <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Remember your password?{' '}
                <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold">
                  Back to Login
                </Link>
              </p>
            </div>

            {/* Help Section */}
            <div className="mt-6 card p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                💡 Can't access your email?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                If you're having trouble accessing your email, try these steps:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  Check your spam/junk folder
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  Make sure you entered the correct email address
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  Contact support if the issue persists
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
