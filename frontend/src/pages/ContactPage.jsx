import { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setLoading(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'support@imageai.com',
      response: 'We reply within 24 hours',
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Available 24/7',
      response: 'Instant response',
    },
    {
      icon: '📚',
      title: 'Documentation',
      description: 'Comprehensive guides',
      response: 'Self-service help',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            We'd love to hear from you. Get in touch with us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{method.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      {method.description}
                    </p>
                    <p className="text-sm text-primary-500">
                      {method.response}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-3">
                <a href="#" className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors text-2xl">
                  🐦
                </a>
                <a href="#" className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors text-2xl">
                  💼
                </a>
                <a href="#" className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors text-2xl">
                  🐙
                </a>
                <a href="#" className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors text-2xl">
                  💬
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Message Sent!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="input-field resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

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
                        'Send Message'
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                How do I reset my password?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Click on "Forgot Password" on the login page and follow the instructions.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                How do I upgrade my plan?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Go to your Dashboard and click on "Upgrade Your Plan" or visit the Pricing page.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Can I use images commercially?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Yes! Pro and Enterprise plans include commercial usage rights for all generated images.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
