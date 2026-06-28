import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function DashboardPage() {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, userCredits, generationHistory, favorites } = useApp();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    { label: 'Total Credits', value: userCredits, icon: '⚡', color: 'text-yellow-500' },
    { label: 'landscope Images Generator', value: generationHistory.length, icon: '🖼️', color: 'text-blue-500' },
    { label: 'Favorites', value: favorites.length, icon: '⭐', color: 'text-yellow-500' },
    { label: 'Current Plan', value: currentUser?.plan || 'Free', icon: '💎', color: 'text-purple-500' },
  ];

  const recentGenerations = generationHistory.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {currentUser?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's an overview of your AI image generation activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`text-4xl ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link to="/generate" className="card p-8 hover:scale-105 transition-transform">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🎨</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Generate New Images
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Create stunning AI images with your ideas
                </p>
              </div>
            </div>
          </Link>

          <Link to="/gallery" className="card p-8 hover:scale-105 transition-transform">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">�️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Browse Gallery
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore all your generated images
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Generations */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recent Generations
              </h2>
              <Link to="/generate" className="text-primary-500 hover:text-primary-600 font-medium">
                View All
              </Link>
            </div>

            {recentGenerations.length > 0 ? (
              <div className="space-y-4">
                {recentGenerations.map((generation) => (
                  <div key={generation.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <img
                      src={generation.images[0]?.url || 'https://picsum.photos/100/100'}
                      alt="Generated"
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white font-medium truncate">
                        {generation.prompt}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {generation.style} • {generation.aspectRatio}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(generation.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No generations yet
                </p>
                <Link to="/generate" className="btn-primary inline-block">
                  Start Creating
                </Link>
              </div>
            )}
          </div>

          {/* Favorites */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Favorite Images
              </h2>
              <Link to="/gallery" className="text-primary-500 hover:text-primary-600 font-medium">
                View All
              </Link>
            </div>

            {favorites.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {favorites.slice(0, 4).map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt="Favorite"
                      className="w-full h-32 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                      <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                        ⭐
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No favorites yet
                </p>
                <Link to="/gallery" className="btn-secondary inline-block">
                  Browse Gallery
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Download History */}
        <div className="card p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                💡 Be Descriptive
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The more details you provide in your prompt, the better the results
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                🎯 Use Style Keywords
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Include style references like "photorealistic" or "oil painting"
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                ⚡ Experiment Freely
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Try different styles and ratios to discover new possibilities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
