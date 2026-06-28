import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', path: '/' },
       { name: 'Gallery', path: '/gallery' },
      { name: 'API', path: '/contact' },
    ],
    company: [
      { name: 'About', path: '/contact' },
      { name: 'Blog', path: '/' },
      { name: 'Careers', path: '/' },
      { name: 'Contact', path: '/contact' },
    ],
    support: [
      { name: 'Help Center', path: '/contact' },
      { name: 'Terms of Service', path: '/' },
      { name: 'Privacy Policy', path: '/' },
      { name: 'Status', path: '/' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'GitHub', icon: '🐙', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'Discord', icon: '💬', url: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="text-2xl font-bold">Image Banalo</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Turn your ideas into stunning AI-generated images. Create beautiful artwork with just a text prompt.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © {currentYear} Image Banalo. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
