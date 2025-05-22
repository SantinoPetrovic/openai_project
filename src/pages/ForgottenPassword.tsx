import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/AuthService';
import { MailIcon, UserIcon, LockIcon } from 'lucide-react';

const ForgottenPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: ''
  });
  const [error, setError] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.forgottenPassword(credentials);
      if (response) {
        setIsSubmit(true);
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {!isSubmit ? (
        <div className="w-full max-w-xs bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">Find your user</h2>
          <p className="text-center mt-4 text-sm text-gray-900 dark:text-white">Please enter your email which you have forgotten your password.</p>
          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Email"
                  onChange={e => {
                    setError('');
                    setCredentials({ ...credentials, email: e.target.value });
                  }}
                />
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
      ) : (
        <div className="w-full max-w-xs bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="text-center mt-4 text-sm text-gray-900 dark:text-white">Please enter your email which you have forgotten your password.</p>
        </div>
      )}
    </div>
  );
};

export default ForgottenPassword;