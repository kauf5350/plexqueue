"use client";

import { useState, useEffect } from 'react';
import { DashboardHeader } from "@/components/DashboardHeader";
import { SearchBar } from "@/components/SearchBar";
import { MediaCard } from "@/components/MediaCard";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

interface SearchResult {
  id: number;
  title: string;
  name: string;
  media_type: 'movie' | 'tv';
  release_date: string;
  first_air_date: string;
  overview: string;
  poster_path: string | null;
}

export default function NewRequestPage() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implement actual API call to TMDB
      const results = await fetchSearchResults(query, page);
      setSearchResults(results);
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
    }
    setIsLoading(false);
  };

  const handleRequest = (id: number) => {
    // TODO: Implement request functionality
    console.log(`Requested media with ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-[hsl(240,10%,3.9%)] text-[hsl(0,0%,98%)] flex flex-col">
      <DashboardHeader />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-center">New Requests</h1>
        
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {isLoading && <div className="text-center">Loading...</div>}

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {searchResults.length === 0 && !isLoading && !error && (
          <div className="text-center">
            <p className="mb-4">Search for your favorite movies and TV shows to request!</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map((result) => (
            <MediaCard
              key={result.id}
              id={result.id}
              title={result.title || result.name}
              mediaType={result.media_type}
              releaseDate={result.release_date || result.first_air_date}
              overview={result.overview}
              posterPath={result.poster_path}
              onRequest={handleRequest}
            />
          ))}
        </div>

        {searchResults.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="mr-2 bg-[hsl(0,0%,98%)] text-[hsl(240,5.9%,10%)] hover:bg-[hsl(0,0%,90%)]"
            >
              Previous
            </Button>
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-[hsl(0,0%,98%)] text-[hsl(240,5.9%,10%)] hover:bg-[hsl(0,0%,90%)]"
            >
              Next
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Mock function to simulate API call
async function fetchSearchResults(query: string, page: number): Promise<SearchResult[]> {
  // TODO: Replace with actual TMDB API call
  return [
    {
      id: 1,
      title: 'Sample Movie',
      name: '',
      media_type: 'movie',
      release_date: '2023-01-01',
      first_air_date: '',
      overview: 'This is a sample movie description.',
      poster_path: null
    },
    // Add more mock results as needed
  ];
}