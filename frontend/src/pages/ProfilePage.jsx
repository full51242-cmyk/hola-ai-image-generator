import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function ProfilePage() {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, logout } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    website: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setFormData({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        bio: '',
        website: '',
      });
    }
  }, [isAuthenticated, currentUser, navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to change password' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      logout();
      navigate('/');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        <div className="space-y-8">
          {/* Profile Information */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Profile Information
            </h2>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <button type="button" className="btn-secondary text-sm">
                    Change Avatar
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="input-field"
                  placeholder="https://example.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="card p-8 border-2 border-red-200 dark:border-red-800">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Danger Zone
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
