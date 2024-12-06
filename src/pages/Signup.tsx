import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';
import { ROUTES } from '../lib/constants';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'resident' | 'provider'>('resident');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (!user) {
        throw new Error('Failed to create user');
      }

      // Profile creation is handled by the database trigger
    } catch (err) {
      console.error('Signup error:', err);
      setError('Failed to create account. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-sm">
      <div className="relative bg-background-light p-8 rounded-lg shadow-xl w-full max-w-md border border-primary/20 m-4">
        <Link to={ROUTES.HOME} className="absolute right-4 top-4 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </Link>
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Join CleanGo</h2>
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
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Account Type</label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors ${
                role === 'resident'
                  ? 'border-primary bg-primary/10 text-primary-light'
                  : 'border-primary/20 bg-background-dark text-gray-400 hover:border-primary/40'
              }`}>
                <input
                  type="radio"
                  value="resident"
                  checked={role === 'resident'}
                  onChange={(e) => setRole(e.target.value as 'resident')}
                  className="sr-only"
                  disabled={loading}
                />
                <span>Resident</span>
              </label>
              <label className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors ${
                role === 'provider'
                  ? 'border-primary bg-primary/10 text-primary-light'
                  : 'border-primary/20 bg-background-dark text-gray-400 hover:border-primary/40'
              }`}>
                <input
                  type="radio"
                  value="provider"
                  checked={role === 'provider'}
                  onChange={(e) => setRole(e.target.value as 'provider')}
                  className="sr-only"
                  disabled={loading}
                />
                <span>Service Provider</span>
              </label>
            </div>
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
          <p className="text-center text-gray-400">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="text-primary hover:text-primary-light">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;