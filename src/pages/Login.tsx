import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { ROUTES } from '../lib/constants';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      // Navigation is handled in AuthContext
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-sm">
      <div className="relative bg-background-light p-8 rounded-lg shadow-xl w-full max-w-md border border-primary/20 m-4">
        <Link to={ROUTES.HOME} className="absolute right-4 top-4 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </Link>
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Welcome Back</h2>
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md bg-background-dark border-primary/20 text-white placeholder-gray-400 focus:border-primary focus:ring focus:ring-primary/20"
              required
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md bg-background-dark border-primary/20 text-white placeholder-gray-400 focus:border-primary focus:ring focus:ring-primary/20"
              required
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          <p className="text-center text-gray-400">
            Don't have an account?{' '}
            <Link to={ROUTES.SIGNUP} className="text-primary hover:text-primary-light">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;