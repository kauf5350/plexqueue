"use client";

import { useState } from 'react';
import { DashboardHeader } from "@/components/DashboardHeader";
import { SearchBar } from "@/components/SearchBar";
import { MediaCard } from "@/components/MediaCard";
import { Footer } from "@/components/Footer";
import { searchMedia, MediaResult } from "@/utils/tmdb";
import { submitRequest } from "../../../utils/supabase";

export default function NewRequestPage() {
  const [searchResults, setSearchResults] = useState<MediaResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      setError(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchMedia(query);
      console.log('Search results:', results.map(r => ({title: r.title || r.name, vote_average: r.vote_average})));
      setSearchResults(results.slice(0, 12)); // Limit to 12 results
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
    }
    setIsLoading(false);
  };

  const handleRequest = async (mediaItem: MediaResult) => {
    try {
      await submitRequest(mediaItem);
      console.log(`Requested media: ${mediaItem.title || mediaItem.name}`);
      // You might want to show a success message or update the UI here
    } catch (error) {
      console.error('Error submitting request:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(240,10%,3.9%)] text-[hsl(0,0%,98%)] flex flex-col">
      <DashboardHeader />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-center">New Requests</h1>
        
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {isLoading && <div className="text-center">Loading...</div>}

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {searchResults.length === 0 && !isLoading && !error && (
          <div className="text-center">
            <p className="mb-4">Search for your favorite movies and TV shows to request!</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((result) => (
            <MediaCard
              key={result.id}
              id={result.id}
              title={result.title || result.name || 'Unknown Title'}
              mediaType={result.media_type}
              releaseDate={result.release_date || result.first_air_date}
              posterPath={result.poster_path}
              overview={result.overview || 'No overview available'}
              rating={result.vote_average}
              onRequest={() => handleRequest(result)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}