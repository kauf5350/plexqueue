import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Film } from 'lucide-react'; // Import Film icon as well

interface MediaCardProps {
  id: number;
  title: string;
  mediaType?: 'movie' | 'tv';  // Make mediaType optional
  releaseDate?: string;
  posterPath?: string | null;
  overview: string;
  rating: number; // Add this line
  onRequest: () => void;
}

export function MediaCard({
  id,
  title,
  mediaType,
  releaseDate,
  posterPath,
  overview,
  rating, // Add this line
  onRequest
}: MediaCardProps) {
  const [imgSrc, setImgSrc] = useState(posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : '/placeholder-poster.svg');
  const [imgError, setImgError] = useState(false);

  console.log(`Card for ${title}:`, { mediaType, releaseDate, rating });

  const formattedDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString()
    : 'Release date unknown';

  const truncatedOverview = overview.length > 150
    ? `${overview.substring(0, 150)}...`
    : overview;

  const displayMediaType = mediaType ? mediaType.toUpperCase() : 'UNKNOWN';

  const handleImageError = () => {
    setImgError(true);
    setImgSrc('/placeholder-poster.svg');
  };

  return (
    <Card className="flex flex-col h-full bg-[hsl(240,3.7%,15.9%)] border-[hsl(240,3.7%,15.9%)]">
      <CardContent className="p-4 flex-grow">
        <div className="flex mb-4">
          <div className="w-1/3 mr-4">
            <div className="aspect-w-2 aspect-h-3 relative bg-gray-700 rounded-md flex items-center justify-center">
              {imgError ? (
                <Film className="w-12 h-12 text-gray-400" />
              ) : (
                <img
                  src={imgSrc}
                  alt={title}
                  className="rounded-md w-full h-full object-cover"
                  onError={handleImageError}
                />
              )}
            </div>
          </div>
          <div className="w-2/3">
            <h3 className="text-lg font-semibold mb-2 text-[hsl(0,0%,98%)]">{title}</h3>
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-[hsl(0,0%,80%)]">{displayMediaType} | {formattedDate}</p>
              <div className="flex items-center">
                <Star className="w-3 h-3 text-yellow-400 mr-1" />
                <span className="text-xs text-[hsl(0,0%,80%)]">{rating ? rating.toFixed(1) : 'N/A'}</span>
              </div>
            </div>
            <p className="text-sm text-[hsl(0,0%,80%)]">{truncatedOverview}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button onClick={onRequest} className="w-full bg-[hsl(0,0%,98%)] text-[hsl(240,5.9%,10%)] hover:bg-[hsl(0,0%,90%)]">
          Request
        </Button>
      </CardFooter>
    </Card>
  );
}