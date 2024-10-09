const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

interface MediaResult {
  id: number;
  title?: string;
  name?: string;
  media_type: 'movie' | 'tv';
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
}

interface MediaDetails extends MediaResult {
  overview: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

export async function searchMedia(query: string, type: 'movie' | 'tv' = 'movie'): Promise<MediaResult[]> {
  const url = `${TMDB_BASE_URL}/search/${type}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch from TMDB API');
  }
  const data = await response.json();
  return data.results;
}

export async function getMediaDetails(id: number, type: 'movie' | 'tv' = 'movie'): Promise<MediaDetails> {
  const url = `${TMDB_BASE_URL}/${type}/${id}?api_key=${TMDB_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch media details from TMDB API');
  }
  const data = await response.json();
  return data;
}