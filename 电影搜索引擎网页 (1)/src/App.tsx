import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { MovieCard } from './components/MovieCard';
import { FilterSection } from './components/FilterSection';
import { MovieDetail } from './components/MovieDetail';
import { Film, Loader2 } from 'lucide-react';
import { searchMovies, getGenreName, type Movie } from './services/api';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([1970, 2025]);
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  // Fetch movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await searchMovies(searchQuery);
        
        // Transform API data to match component format
        const transformedMovies = data.results.map((movie: Movie) => ({
          id: movie.id,
          title: movie.title,
          englishTitle: movie.original_title || movie.title,
          year: movie.release_date ? new Date(movie.release_date).getFullYear() : 0,
          rating: movie.rating || 0,
          genre: movie.genre_ids?.map(id => getGenreName(id)) || [],
          director: 'N/A', // Not available from current API
          poster: movie.poster || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
          description: movie.overview || 'No description available.',
          popularity: movie.popularity || 0,
          score: movie.score || 0
        }));
        
        setMovies(transformedMovies);
      } catch (err) {
        setError('Failed to fetch movies. Please make sure the backend server is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchMovies();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const allGenres = Array.from(new Set(movies.flatMap(movie => movie.genre)));

  const filteredMovies = movies
    .filter(movie => {
      const matchesGenre = selectedGenres.length === 0 || 
                          selectedGenres.some(genre => movie.genre.includes(genre));
      const matchesYear = movie.year >= yearRange[0] && movie.year <= yearRange[1];
      
      return matchesGenre && matchesYear;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {selectedMovie ? (
        <MovieDetail movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
      ) : (
        <>
          <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center gap-3 mb-6">
                <Film className="w-8 h-8 text-purple-400" />
                <h1 className="text-white">Movie Search Engine</h1>
              </div>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </header>

          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <aside className="lg:col-span-1">
                <FilterSection
                  allGenres={allGenres}
                  selectedGenres={selectedGenres}
                  onGenresChange={setSelectedGenres}
                  yearRange={yearRange}
                  onYearRangeChange={setYearRange}
                  sortBy={sortBy}
                  onSortByChange={setSortBy}
                />
              </aside>

              <main className="lg:col-span-3">
                {error && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-200">{error}</p>
                  </div>
                )}
                
                <div className="mb-6">
                  <p className="text-white/80">
                    Found <span className="text-purple-400">{filteredMovies.length}</span> movies
                  </p>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
                  </div>
                ) : filteredMovies.length === 0 ? (
                  <div className="text-center py-20">
                    <Film className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60">No movies found matching your criteria</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredMovies.map(movie => (
                      <MovieCard 
                        key={movie.id} 
                        movie={movie}
                        onClick={() => setSelectedMovie(movie)}
                      />
                    ))}
                  </div>
                )}
              </main>
            </div>
          </div>
        </>
      )}
    </div>
  );
}