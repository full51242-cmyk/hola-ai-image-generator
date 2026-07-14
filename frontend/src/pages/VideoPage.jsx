import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/apiClient';

function VideoPage() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('cinematic');
  const [duration, setDuration] = useState('8s');
  const [quality, setQuality] = useState('1080p');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedVideos, setGeneratedVideos] = useState([]);

  const styles = [
    { id: 'cinematic', label: 'Cinematic', icon: '🎬' },
    { id: 'anime', label: 'Anime', icon: '🌸' },
    { id: 'documentary', label: 'Documentary', icon: '📽️' },
    { id: 'fantasy', label: 'Fantasy', icon: '✨' },
    { id: 'commercial', label: 'Commercial', icon: '🛍️' },
  ];

  const durations = ['4s', '8s', '12s'];
  const qualities = ['720p', '1080p', '4K'];

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a video prompt first.');
      return;
    }

    setError('');
    setLoading(true);
    setGeneratedVideos([]);

    try {
      const resp = await api.post('/videos', {
        prompt,
        style,
        duration,
        quality,
      });

      const data = resp.data;
      if (!data?.success) {
        throw new Error(data?.message || 'Failed to generate video');
      }

      if (data.data?.videos?.length > 0) {
        setGeneratedVideos(data.data.videos);
      } else {
        throw new Error('No videos were returned by the server');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Video generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            ← Back home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-3">
            Text to Video Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">
            Turn a simple sentence into a polished short video concept with a ready-to-preview result.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleGenerate} className="lg:col-span-1 space-y-5 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-gray-50 dark:bg-gray-900/70">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Describe your video
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A cinematic sunset over a futuristic city with flying cars..."
                className="w-full h-36 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 p-4 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {styles.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStyle(item.id)}
                    className={`rounded-lg border px-3 py-2 text-sm ${style === item.id ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'}`}
                  >
                    <span className="mr-1">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration
              </label>
              <div className="flex gap-2">
                {durations.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setDuration(item)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm ${duration === item ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quality
              </label>
              <div className="flex gap-2">
                {qualities.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuality(item)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm ${quality === item ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Generating video...' : 'Generate video'}
            </button>
          </form>

          <div className="lg:col-span-2">
            {generatedVideos.length > 0 ? (
              <div className="space-y-4">
                {generatedVideos.map((video) => (
                  <div key={video.id} className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <video
                      controls
                      className="w-full aspect-video bg-black"
                      poster={video.posterUrl}
                    >
                      <source src={video.url} type="video/mp4" />
                    </video>
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{video.title}</h2>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{video.prompt}</p>
                        </div>
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-300"
                        >
                          Open video
                        </a>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">Style: {video.style}</span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">Duration: {video.duration}</span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">Quality: {video.quality}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center text-gray-500 dark:text-gray-400">
                <p className="text-lg font-medium">Your generated videos will appear here.</p>
                <p className="mt-2">Enter a prompt and create a short preview in seconds.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
