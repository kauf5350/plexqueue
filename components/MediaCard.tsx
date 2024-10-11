import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Film } from 'lucide-react';
import { CheckIcon, Loader2Icon } from 'lucide-react';

interface MediaCardProps {
  id: number;
  title: string;
  mediaType: string;
  releaseDate?: string;
  posterPath?: string | null;
  onRequest: () => Promise<void>;
  isRequested?: boolean;
  overview?: string;
  voteAverage?: number;
}

export function MediaCard({ 
  id, 
  title, 
  mediaType, 
  releaseDate, 
  posterPath, 
  onRequest, 
  isRequested,
  overview,
  voteAverage
}: MediaCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(isRequested);

  const handleRequest = async () => {
    setIsSubmitting(true);
    await onRequest();
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const [imgSrc, setImgSrc] = useState(posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : '/placeholder-poster.svg');
  const [imgError, setImgError] = useState(false);

  const formattedDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString()
    : 'Release date unknown';

  const displayMediaType = mediaType ? mediaType.toUpperCase() : 'UNKNOWN';

  const handleImageError = () => {
    setImgError(true);
    setImgSrc('/placeholder-poster.svg');
  };

  return (
    <Card className="overflow-hidden bg-[hsl(240,10%,3.9%)] border-[hsl(240,3.7%,15.9%)]">
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
              {voteAverage !== undefined && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-xs text-[hsl(0,0%,80%)]">{voteAverage.toFixed(1)}</span>
                </div>
              )}
            </div>
            {overview && (
              <p className="text-sm text-[hsl(0,0%,80%)] line-clamp-3">{overview}</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleRequest} 
          disabled={isSubmitting || isSubmitted}
        >
          {isSubmitted ? (
            <>
              <CheckIcon className="mr-2 h-4 w-4" /> Requested
            </>
          ) : isSubmitting ? (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            'Request'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}