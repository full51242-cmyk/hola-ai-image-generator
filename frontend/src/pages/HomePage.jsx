import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleGenerate = (e) => {
    e.preventDefault();
    navigate(`/generate?prompt=${encodeURIComponent(prompt)}`);
  };

  const popularPrompts = [
    'A cute cat wearing sunglasses',
    'Cyberpunk city at night',
    'Anime girl with pink hair',
    '3D render of a coffee cup',
    'Floating island in the sky',
    'Astronaut riding a horse',
    'Magical forest with glowing mushrooms',
    'Steampunk airship adventure',
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Simple Navbar */}
      <nav className="px-8 py-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          Image Banalo
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            to="/gallery"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Gallery
          </Link>
          <Link
            to="/login"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-6 pt-24 pb-32">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Turn your words into <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              stunning images
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Generate beautiful AI images instantly with just a text prompt
          </p>

          {/* Prompt Input */}
          <form onSubmit={handleGenerate} className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to see..."
                className="w-full px-8 py-6 text-lg rounded-full border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Generate
              </button>
            </div>
          </form>

          {/* Popular Prompts */}
          <div className="mb-20">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Try one of these:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularPrompts.map((samplePrompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(samplePrompt)}
                  className="px-5 py-2 text-sm rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {samplePrompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="px-8 py-8 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 Landscope</p>
          <div className="flex space-x-6">
            <Link to="/contact" className="hover:text-gray-900 dark:hover:text-white">
              Contact
            </Link>
            <Link to="/pricing" className="hover:text-gray-900 dark:hover:text-white">
              Pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
