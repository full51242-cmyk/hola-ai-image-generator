import { useState } from 'react';
import { useApp } from '../context/AppContext';

function GalleryPage() {
  const { favorites, addToFavorites, removeFromFavorites, searchQuery, setSearchQuery } = useApp();
  
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(12);
  const [likedImages, setLikedImages] = useState({});

  // Sample gallery images
  const [galleryImages] = useState([
    { id: 1, url: 'https://picsum.photos/400/400?random=1', prompt: 'Mountain landscape', style: 'realistic' },
    { id: 2, url: 'https://picsum.photos/400/400?random=2', prompt: 'Anime character', style: 'anime' },
    { id: 3, url: 'https://picsum.photos/400/400?random=3', prompt: '3D render city', style: '3d-render' },
    { id: 4, url: 'https://picsum.photos/400/400?random=4', prompt: 'Cartoon illustration', style: 'cartoon' },
    { id: 5, url: 'https://picsum.photos/400/400?random=5', prompt: 'Digital art portrait', style: 'digital-art' },
    { id: 6, url: 'https://picsum.photos/400/400?random=6', prompt: 'Fantasy castle', style: 'fantasy' },
    { id: 7, url: 'https://picsum.photos/400/400?random=7', prompt: 'Ocean sunset', style: 'realistic' },
    { id: 8, url: 'https://picsum.photos/400/400?random=8', prompt: 'Anime scene', style: 'anime' },
    { id: 9, url: 'https://picsum.photos/400/400?random=9', prompt: '3D product', style: '3d-render' },
    { id: 10, url: 'https://picsum.photos/400/400?random=10', prompt: 'Cartoon character', style: 'cartoon' },
    { id: 11, url: 'https://picsum.photos/400/400?random=11', prompt: 'Digital landscape', style: 'digital-art' },
    { id: 12, url: 'https://picsum.photos/400/400?random=12', prompt: 'Fantasy dragon', style: 'fantasy' },
    { id: 13, url: 'https://picsum.photos/400/400?random=13', prompt: 'Forest path', style: 'realistic' },
    { id: 14, url: 'https://picsum.photos/400/400?random=14', prompt: 'Anime girl', style: 'anime' },
    { id: 15, url: 'https://picsum.photos/400/400?random=15', prompt: '3D room', style: '3d-render' },
    { id: 16, url: 'https://picsum.photos/400/400?random=16', prompt: 'Cartoon animal', style: 'cartoon' },
    { id: 17, url: 'https://picsum.photos/400/400?random=17', prompt: 'Digital abstract', style: 'digital-art' },
    { id: 18, url: 'https://picsum.photos/400/400?random=18', prompt: 'Fantasy warrior', style: 'fantasy' },
  ]);

  const styles = [
    { value: 'all', label: 'All Styles' },
    { value: 'realistic', label: 'Realistic' },
    { value: 'anime', label: 'Anime' },
    { value: '3d-render', label: '3D Render' },
    { value: 'cartoon', label: 'Cartoon' },
    { value: 'digital-art', label: 'Digital Art' },
    { value: 'fantasy', label: 'Fantasy' },
  ];

  // Filter images
  const filteredImages = galleryImages.filter(image => {
    const matchesStyle = selectedStyle === 'all' || image.style === selectedStyle;
    const matchesSearch = image.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStyle && matchesSearch;
  });

  // Pagination
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = filteredImages.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);

  const handleLike = (imageId) => {
    setLikedImages(prev => ({ ...prev, [imageId]: !prev[imageId] }));
  };

  const handleFavorite = (image) => {
    if (favorites.find(fav => fav.id === image.id)) {
      removeFromFavorites(image.id);
    } else {
      addToFavorites(image);
    }
  };

  const handleDownload = (imageUrl, imageId) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `gallery-image-${imageId}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Gallery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore stunning AI-generated images
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Style Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {styles.map((style) => (
              <button
                key={style.value}
                onClick={() => {
                  setSelectedStyle(style.value);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedStyle === style.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        {/* Images Grid */}
        {currentImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentImages.map((image) => (
              <div key={image.id} className="card overflow-hidden group">
                <div className="relative">
                  <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-64 object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDownload(image.url, image.id)}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        ⬇️
                      </button>
                      <button
                        onClick={() => handleLike(image.id)}
                        className={`w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors ${
                          likedImages[image.id] ? 'text-red-500' : ''
                        }`}
                      >
                        {likedImages[image.id] ? '❤️' : '🤍'}
                      </button>
                      <button
                        onClick={() => handleFavorite(image)}
                        className={`w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors ${
                          favorites.find(fav => fav.id === image.id) ? 'text-yellow-500' : ''
                        }`}
                      >
                        ⭐
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {image.prompt}
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs rounded-full">
                    {image.style}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No images found matching your criteria
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GalleryPage;
