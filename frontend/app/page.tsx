'use client';

import { useState, useEffect } from 'react';
import { OAuth2User } from '@/types';
import { apiClient } from '@/lib/api';

export default function Home() {
  const [user, setUser] = useState<OAuth2User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await apiClient.getCurrentUser();
      setUser(userData);
    } catch (err) {
      console.error('Failed to load user:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Hello-Kot CRUD App
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          A modern web application with OAuth2 authentication and full CRUD operations.
        </p>

        {user ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Profile</h2>
            <div className="space-y-2">
              {user.avatar_url && (
                <div className="mb-4">
                  <img
                    src={user.avatar_url}
                    alt="User avatar"
                    className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                  />
                </div>
              )}
              <p className="text-gray-700">
                <span className="font-semibold">Username:</span> {user.login || 'N/A'}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Name:</span> {user.name || 'N/A'}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> {user.email || 'N/A'}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Please login with GitHub to access the full features of this application.
            </p>
            <a
              href="http://localhost:8080/oauth2/authorization/github"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Login with GitHub
            </a>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              OAuth2 authentication with GitHub
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              User management (CRUD operations)
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Product management (CRUD operations)
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Modern, responsive UI with TailwindCSS
            </li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h2>
          <div className="space-y-2">
            <a
              href="/users"
              className="block text-blue-600 hover:text-blue-800 hover:underline"
            >
              Manage Users →
            </a>
            <a
              href="/products"
              className="block text-blue-600 hover:text-blue-800 hover:underline"
            >
              Manage Products →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
