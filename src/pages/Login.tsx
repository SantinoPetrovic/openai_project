import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/AuthService';
import { UserIcon, LockIcon } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.login(credentials);
      if (response) {
        navigate('/');
      }
    } catch (err) {
      setError('Login failed. Check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-full max-w-xs bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">Login</h2>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                id="username"
                type="text"
                required
                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Username"
                onChange={e => {
                  setError('');
                  setCredentials({ ...credentials, username: e.target.value });
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                id="password"
                type="password"
                required
                className={`shadow appearance-none border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded w-full py-2 pl-10 pr-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                placeholder="Password"
                onChange={e => {
                  setError('');
                  setCredentials({ ...credentials, password: e.target.value });
                }}
              />
              {error && (
                <p className="text-red-500 dark:text-red-400 text-xs italic mt-1">{error}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition-colors duration-200"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
