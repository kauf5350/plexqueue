import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Film, Tv } from "lucide-react";

interface MediaCardProps {
  id: number;
  title: string;
  mediaType: 'movie' | 'tv';
  releaseDate: string;
  overview: string;
  posterPath: string | null;
  onRequest: (id: number) => void;
}

export function MediaCard({ id, title, mediaType, releaseDate, overview, posterPath, onRequest }: MediaCardProps) {
  return (
    <Card className="bg-[hsl(240,10%,3.9%)] border-[hsl(240,3.7%,15.9%)]">
      <CardContent className="p-4">
        <img
          src={posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : '/placeholder.jpg'}
          alt={title}
          className="w-full h-64 object-cover mb-2 rounded"
        />
        <h3 className="font-bold mb-1">{title}</h3>
        <div className="flex items-center mb-1">
          {mediaType === 'movie' ? <Film className="mr-1 h-4 w-4" /> : <Tv className="mr-1 h-4 w-4" />}
          <span className="text-sm">{mediaType === 'movie' ? 'Movie' : 'TV Show'}</span>
          <span className="ml-2 text-sm">({new Date(releaseDate).getFullYear()})</span>
        </div>
        <p className="text-sm mb-2 line-clamp-3">{overview}</p>
        <Button onClick={() => onRequest(id)} className="w-full bg-[hsl(0,0%,98%)] text-[hsl(240,5.9%,10%)] hover:bg-[hsl(0,0%,90%)]">
          Request
        </Button>
      </CardContent>
    </Card>
  );
}