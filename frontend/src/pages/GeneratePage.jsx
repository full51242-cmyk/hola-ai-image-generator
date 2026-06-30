import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import api from '../services/apiClient';

function GeneratePage() {
  const [searchParams] = useSearchParams();
  const { addToHistory } = useApp();

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState('');
  const [generatedImages, setGeneratedImages] = useState([]);
  const [style, setStyle] = useState('realistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');

  useEffect(() => {
    const initialPrompt = searchParams.get('prompt');
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [searchParams]);

  const styles = [
    { id: 'realistic', label: 'Realistic', icon: '📸' },
    { id: 'anime', label: 'Anime', icon: '🎌' },
    { id: '3d', label: '3D', icon: '🎮' },
    { id: 'cartoon', label: 'Cartoon', icon: '🎨' },
    { id: 'digital', label: 'Digital', icon: '💻' },
    { id: 'fantasy', label: 'Fantasy', icon: '🐉' },
  ];

  const aspectRatios = [
    { id: '1:1', label: '1:1' },
    { id: '16:9', label: '16:9' },
    { id: '9:16', label: '9:16' },
    { id: '4:5', label: '4:5' },
  ];

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt first!');
      return;
    }

    setError('');
    setLoading(true);
    setGeneratedImages([]);
    
    const steps = [
      'Preparing your request...',
      'Sending to AI...',
      'Generating image...',
      'Almost done...'
    ];

    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      if (stepIndex < steps.length) {
        setLoadingStep(steps[stepIndex]);
        stepIndex++;
      }
    }, 800);

    try {
      const resp = await api.post('/api/images', {
        prompt: prompt,
        style: style,
        aspectRatio: aspectRatio,
      });

      const data = resp.data;

      if (!data || !data.success) {
        throw new Error(data?.message || 'Something went wrong');
      }

      clearInterval(stepInterval);
      
      if (data.data?.images && data.data.images.length > 0) {
        setGeneratedImages(data.data.images);
        
        // Add to history
        addToHistory({
          id: 'history-' + Date.now(),
          prompt,
          images: data.data.images,
          style,
          aspectRatio,
          timestamp: new Date().toISOString(),
        });
      } else {
        throw new Error('No images returned from server');
      }
    } catch (err) {
      clearInterval(stepInterval);
      console.error(err);
      setError(err.message || 'Failed to generate image');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  const downloadImage = (image) => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `image-banalo-${image.id}.jpg`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Simple Top Nav */}
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            Image Banalo
          </Link>
          <Link
            to="/gallery"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Gallery
          </Link>
        </div>
      </div>

      {/* Main Generator Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Side: Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Create something new
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Describe what you want to see in detail
              </p>
            </div>

            {/* Prompt Input */}
            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A cute corgi wearing a tiny hat..."
                  className="w-full h-40 p-5 border-2 border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Style Selection */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-3">
                  Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {styles.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStyle(s.id)}
                      className={`px-4 py-3 rounded-lg border transition-all ${
                        style === s.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-lg block mb-1">{s.icon}</span>
                      <span className="text-sm">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-3">
                  Aspect Ratio
                </label>
                <div className="flex gap-2">
                  {aspectRatios.map((ratio) => (
                    <button
                      key={ratio.id}
                      type="button"
                      onClick={() => setAspectRatio(ratio.id)}
                      className={`flex-1 px-4 py-3 rounded-lg border text-center transition-all ${
                        aspectRatio === ratio.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                      }`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg p-4">
                  <p className="font-medium mb-1">Something went wrong</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Generate Button */}
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </form>
          </div>

          {/* Right Side: Output Panel */}
          <div className="lg:col-span-2">
            {generatedImages.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Results
                  </h2>
                  <button
                    onClick={() => setGeneratedImages([])}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Generate more
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {generatedImages.map((image) => (
                    <div
                      key={image.id}
                      className="relative group rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900"
                    >
                      <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full object-cover"
                        style={{
                          aspectRatio: image.aspectRatio,
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-2">
                          <button
                            onClick={() => downloadImage(image)}
                            className="flex-1 bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                {loading ? (
                  <div>
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4" />
                    <p className="text-gray-700 dark:text-gray-300 text-lg mb-1">
                      {loadingStep}
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm">
                      This takes a few seconds...
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">🎨</div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                      Your image will appear here
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm">
                      Enter a prompt and click Generate to start
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneratePage;
