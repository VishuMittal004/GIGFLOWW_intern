"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { FaApple } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function LoginPageClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Simulating login for:', { email, password });
    // TODO: Replace with actual API call for login
    // Assuming API call is successful:
    if (typeof window !== 'undefined') {
      localStorage.setItem('userLoggedIn', 'true');
    }
    router.push('/');
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/gig1.jpg"
          alt="Gig1 Background"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-slate-300 to-[#357ABD] relative">
        <div className="w-full max-w-md space-y-6 relative">
          <div className="flex justify-center items-center mb-6">
            <Image src="/gig.png" alt="GigFloww Logo" width={36} height={36} />
            <span className="ml-2.5 text-2xl font-bold tracking-wide text-white" style={{ fontFamily: 'Varela Round, sans-serif', textShadow: '-1px -1px 0 #888, 1px -1px 0 #888, -1px 1px 0 #888, 1px 1px 0 #888' }}>GIGFLOWW</span>
          </div>

          <h2 className="text-lg font-medium text-center text-slate-600" style={{ fontFamily: 'Varela Round, sans-serif' }}>Welcome back!</h2>
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-slate-800" style={{ fontFamily: 'Varela Round, sans-serif' }}>Log in</h1>
          <p className="text-center text-slate-500 text-sm sm:text-base">
            Please log in to your account to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-slate-700 mb-1.5">Email Address</label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-blue-500 focus:border-blue-500 rounded-full h-12 text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-slate-700 mb-1.5">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-blue-500 focus:border-blue-500 rounded-full h-12 text-sm"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-[#357ABD] to-[#4A90E2] hover:from-[#4A90E2] hover:to-[#357ABD] text-white py-3 text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out h-12">
              Log in
            </Button>
          </form>

          <p className="text-center text-sm text-black">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Register
            </Link>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant="outline" className="w-full flex items-center justify-center py-3 border-black bg-transparent hover:bg-sky-100/50 hover:text-sky-500 text-slate-700 rounded-full h-11 text-sm transition-colors duration-150">
              <FcGoogle className="mr-2 h-6 w-6" />
              Log in with Google
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center py-3 border-black bg-transparent hover:bg-sky-100/50 hover:text-sky-500 text-slate-700 rounded-full h-11 text-sm transition-colors duration-150">
              <FaApple className="mr-2 h-6 w-6" />
              Log in with Apple
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
