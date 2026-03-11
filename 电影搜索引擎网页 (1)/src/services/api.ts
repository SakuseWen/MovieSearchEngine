const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface Movie {
  id: number;
  title: string;
  original_title?: string;
  overview?: string;
  original_language?: string;
  release_date?: string;
  rating?: number;
  popularity?: number;
  genre_ids?: number[];
  poster?: string;
  score?: number;
}

export interface SearchResponse {
  total: number;
  results: Movie[];
}

export const searchMovies = async (query: string = ''): Promise<SearchResponse> => {
  try {
    const url = query 
      ? `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/search`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// TMDB Genre mapping
export const GENRE_MAP: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

export const getGenreName = (genreId: number): string => {
  return GENRE_MAP[genreId] || 'Unknown';
};
