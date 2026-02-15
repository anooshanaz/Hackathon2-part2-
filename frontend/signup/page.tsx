'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(email, password);
      router.push('/tasks');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 
    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
    animate-gradient-x">

      <div className="w-full max-w-md backdrop-blur-lg bg-white/20 
      border border-white/30 rounded-2xl shadow-2xl p-8">

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            Create Account ✨
          </h2>
          <p className="text-white/80 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold underline hover:text-yellow-300">
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-white p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white 
            placeholder-white/70 focus:outline-none focus:ring-2 
            focus:ring-yellow-300 transition"
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white 
            placeholder-white/70 focus:outline-none focus:ring-2 
            focus:ring-yellow-300 transition"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white 
            placeholder-white/70 focus:outline-none focus:ring-2 
            focus:ring-yellow-300 transition"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white 
            placeholder-white/70 focus:outline-none focus:ring-2 
            focus:ring-yellow-300 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white 
            bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 
            hover:scale-105 hover:shadow-lg 
            transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account 🚀'}
          </button>
        </form>

        <p className="text-center text-xs text-white/70 mt-6">
          By signing up you agree to our Terms & Privacy Policy
        </p>

      </div>
    </div>
  );
};

export default SignupPage;
