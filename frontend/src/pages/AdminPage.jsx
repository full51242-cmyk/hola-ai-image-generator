import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function AdminPage() {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for admin dashboard
  const [stats] = useState({
    totalUsers: 12847,
    activeUsers: 3245,
    totalGenerations: 234567,
    revenue: 45678,
  });

  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'Pro', status: 'active', joined: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'Free', status: 'active', joined: '2024-02-20' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', plan: 'Enterprise', status: 'active', joined: '2024-01-05' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', plan: 'Pro', status: 'inactive', joined: '2023-12-10' },
  ]);

  const [recentActivity] = useState([
    { id: 1, user: 'John Doe', action: 'Generated 4 images', time: '2 minutes ago' },
    { id: 2, user: 'Jane Smith', action: 'Upgraded to Pro plan', time: '15 minutes ago' },
    { id: 3, user: 'Bob Wilson', action: 'Generated 10 images', time: '1 hour ago' },
    { id: 4, user: 'Alice Brown', action: 'Signed up', time: '3 hours ago' },
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'subscriptions', label: 'Subscriptions', icon: '💳' },
    { id: 'content', label: 'Content', icon: '🖼️' },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your platform and monitor activity
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stats.totalUsers.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-4xl">👥</div>
                </div>
              </div>
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Users</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stats.activeUsers.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-4xl">⚡</div>
                </div>
              </div>
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Generations</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stats.totalGenerations.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-4xl">🖼️</div>
                </div>
              </div>
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Revenue</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${stats.revenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-4xl">💰</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{activity.user}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{activity.action}</p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                User Management
              </h2>
              <button className="btn-primary text-sm">
                Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Plan
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Joined
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{user.name}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.plan === 'Enterprise' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                          user.plan === 'Pro' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' :
                          'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {user.plan}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                          'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.joined}</td>
                      <td className="py-3 px-4">
                        <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="card p-12 text-center">
            <div className="text-6xl mb-4">💳</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Subscription Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              View and manage all subscriptions here
            </p>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="card p-12 text-center">
            <div className="text-6xl mb-4">🖼️</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Content Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Moderate and manage generated content
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
