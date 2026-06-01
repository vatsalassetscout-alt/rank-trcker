'use client';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button'; // We'll create this

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-6">
        <h1 className="text-6xl font-bold mb-6">Free SEO Tool</h1>
        <p className="text-2xl mb-8 text-gray-600">
          Ubersuggest + GSC + Competitor Analysis — Completely Free
        </p>
        <button
          onClick={() => signIn('google')}
          className="bg-black text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-800"
        >
          Login with Google to Connect GSC
        </button>
      </div>
    </div>
  );
}
