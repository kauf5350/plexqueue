import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search for movies and TV shows"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow bg-[hsl(240,3.7%,15.9%)] text-[hsl(0,0%,98%)] border-[hsl(240,3.7%,15.9%)]"
        />
        <Button 
          type="submit" 
          className="bg-[hsl(0,0%,98%)] text-[hsl(240,5.9%,10%)] hover:bg-[hsl(0,0%,90%)]"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : (
            <>
              <Search className="mr-2 h-4 w-4" /> Search
            </>
          )}
        </Button>
      </div>
    </form>
  );
}