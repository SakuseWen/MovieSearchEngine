import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { MovieCard } from './components/MovieCard';
import { FilterSection } from './components/FilterSection';
import { MovieDetail } from './components/MovieDetail';
import { Film } from 'lucide-react';

const mockMovies = [
  {
    id: 1,
    title: 'Inception',
    englishTitle: 'Inception',
    year: 2010,
    rating: 8.8,
    genre: ['Sci-Fi', 'Action', 'Thriller'],
    director: 'Christopher Nolan',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'
  },
  {
    id: 2,
    title: 'Interstellar',
    englishTitle: 'Interstellar',
    year: 2014,
    rating: 8.7,
    genre: ['Sci-Fi', 'Drama'],
    director: 'Christopher Nolan',
    poster: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
  },
  {
    id: 3,
    title: 'The Shawshank Redemption',
    englishTitle: 'The Shawshank Redemption',
    year: 1994,
    rating: 9.3,
    genre: ['Drama'],
    director: 'Frank Darabont',
    poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
  },
  {
    id: 4,
    title: 'The Godfather',
    englishTitle: 'The Godfather',
    year: 1972,
    rating: 9.2,
    genre: ['Drama', 'Crime'],
    director: 'Francis Ford Coppola',
    poster: 'https://images.unsplash.com/photo-1574267432644-f610a3f877e6?w=400&h=600&fit=crop',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'
  },
  {
    id: 5,
    title: 'Titanic',
    englishTitle: 'Titanic',
    year: 1997,
    rating: 7.9,
    genre: ['Romance', 'Drama'],
    director: 'James Cameron',
    poster: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=400&h=600&fit=crop',
    description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.'
  },
  {
    id: 6,
    title: 'The Matrix',
    englishTitle: 'The Matrix',
    year: 1999,
    rating: 8.7,
    genre: ['Sci-Fi', 'Action'],
    director: 'The Wachowskis',
    poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
  },
  {
    id: 7,
    title: 'Forrest Gump',
    englishTitle: 'Forrest Gump',
    year: 1994,
    rating: 8.8,
    genre: ['Drama', 'Romance'],
    director: 'Robert Zemeckis',
    poster: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop',
    description: 'The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.'
  },
  {
    id: 8,
    title: 'The Avengers',
    englishTitle: 'The Avengers',
    year: 2012,
    rating: 8.0,
    genre: ['Action', 'Sci-Fi', 'Adventure'],
    director: 'Joss Whedon',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
    description: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army.'
  },
  {
    id: 9,
    title: 'Coco',
    englishTitle: 'Coco',
    year: 2017,
    rating: 8.4,
    genre: ['Animation', 'Adventure', 'Family'],
    director: 'Lee Unkrich',
    poster: 'https://images.unsplash.com/photo-1514894780887-121968d00567?w=400&h=600&fit=crop',
    description: 'Aspiring musician Miguel, confronted with his family\'s ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather.'
  },
  {
    id: 10,
    title: 'The Dark Knight',
    englishTitle: 'The Dark Knight',
    year: 2008,
    rating: 9.0,
    genre: ['Action', 'Crime', 'Drama'],
    director: 'Christopher Nolan',
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests to fight injustice.'
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([1970, 2025]);
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');
  const [selectedMovie, setSelectedMovie] = useState<typeof mockMovies[0] | null>(null);

  const allGenres = Array.from(new Set(mockMovies.flatMap(movie => movie.genre)));

  const filteredMovies = mockMovies
    .filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.englishTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.director.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenres.length === 0 || 
                          selectedGenres.some(genre => movie.genre.includes(genre));
      const matchesYear = movie.year >= yearRange[0] && movie.year <= yearRange[1];
      
      return matchesSearch && matchesGenre && matchesYear;
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
                <div className="mb-6">
                  <p className="text-white/80">
                    Found <span className="text-purple-400">{filteredMovies.length}</span> movies
                  </p>
                </div>
                
                {filteredMovies.length === 0 ? (
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