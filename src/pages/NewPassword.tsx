import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authService } from '../services/AuthService';
import { MailIcon, UserIcon, LockIcon } from 'lucide-react';

const NewPassword = () => {
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    newPassword: '',
    resetToken: ''
  });
  const [confirmPasswordCredentials, setConfirmPasswordCredentials] = useState({
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (confirmPasswordCredentials.confirmPassword !== credentials.newPassword) {
        setError('The passwords does not match.');
        return;
      }
      const response = await authService.resetPassword(credentials);
      if (response) {
        navigate('/login');
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    setCredentials({ ...credentials, resetToken: resetToken ? resetToken : '' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="w-full max-w-xs bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">Reset your password</h2>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="newPassword">
            Enter your new password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                id="newPassword"
                type="password"
                required
                className={`shadow appearance-none border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded w-full py-2 pl-10 pr-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                placeholder="Password"
                onChange={e => {
                  setError('');
                  setCredentials({ ...credentials, newPassword: e.target.value });
                }}
              />
              {error && (
                <p className="text-red-500 dark:text-red-400 text-xs italic mt-1">{error}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm your new password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                required
                className={`shadow appearance-none border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded w-full py-2 pl-10 pr-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                placeholder="Password"
                onChange={e => {
                  setError('');
                  setConfirmPasswordCredentials({ ...confirmPasswordCredentials, confirmPassword: e.target.value });
                }}
              />
              {error && (
                <p className="text-red-500 dark:text-red-400 text-xs italic mt-1">{error}</p>
              )}
            </div>
          </div>

          <div className="mt-5 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition-colors duration-200"
            >
              {isLoading ? '..' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;