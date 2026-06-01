'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { serperSearch } from '@/lib/serper';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/');
    }
  }, [status, router]);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await serperSearch(query);
      setResults(data);
    } catch (error) {
      alert("Error fetching data");
    }
    setLoading(false);
  };

  if (status === "loading") return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">FreeSEO Tool</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {session?.user?.name}</span>
            <button 
              onClick={() => router.push('/')}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-8">Keyword Research</h2>

        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter keyword (e.g. best laptops 2026)"
            className="flex-1 border border-gray-300 rounded-xl px-5 py-3 text-lg"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-black text-white px-8 rounded-xl hover:bg-gray-800"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {results && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold text-xl mb-4">Top Results for "{query}"</h3>
            <div className="space-y-4">
              {results.organic?.slice(0, 10).map((result: any, i: number) => (
                <div key={i} className="border-b pb-4">
                  <p className="text-blue-600 font-medium">{result.title}</p>
                  <p className="text-sm text-gray-500">{result.link}</p>
                  <p className="text-gray-600 mt-1 text-sm">{result.snippet}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
