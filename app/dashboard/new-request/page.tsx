"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr'
import { DashboardHeader } from "@/components/DashboardHeader";
import { SearchBar } from "@/components/SearchBar";
import { MediaCard } from "@/components/MediaCard";
import { Footer } from "@/components/Footer";
import { searchMedia, MediaResult } from "@/utils/tmdb";
import { useToast } from "@/components/hooks/use-toast";

export default function NewRequestPage() {
  const [searchResults, setSearchResults] = useState<MediaResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [submittedRequests, setSubmittedRequests] = useState<Set<number>>(new Set());

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/sign-in');
      }
    };
    checkUser();
  }, [router, supabase.auth]);

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
      console.log('Search results:', results.map(r => ({title: r.title || r.name})));
      setSearchResults(results.slice(0, 12)); // Limit to 12 results
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
    }
    setIsLoading(false);
  };

  const handleRequest = async (mediaItem: MediaResult) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to submit a request.",
          variant: "destructive",
        });
        router.push('/sign-in');
        return;
      }

      const response = await fetch('/api/submit-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mediaItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit request');
      }

      const result = await response.json();
      console.log('Request submitted:', result);
      toast({
        title: "Request Submitted",
        description: `Your request for ${mediaItem.title || mediaItem.name} has been submitted successfully.`,
      });
      
      setSubmittedRequests(prev => new Set(prev).add(mediaItem.id));
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
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
              posterPath={result.poster_path || null}
              onRequest={() => handleRequest(result)}
              isRequested={submittedRequests.has(result.id)}
              overview={result.overview} // Add this line
              voteAverage={result.vote_average} // Add this line
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}