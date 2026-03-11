import { Star, Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Movie {
  id: number;
  title: string;
  englishTitle: string;
  year: number;
  rating: number;
  genre: string[];
  director: string;
  poster: string;
  description: string;
}

interface MovieDetailProps {
  movie: Movie;
  onBack: () => void;
}

export function MovieDetail({ movie, onBack }: MovieDetailProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/10 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Movies
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genre.map(genre => (
                <Badge key={genre} className="bg-purple-500/30 text-purple-200 border-purple-400/50">
                  {genre}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-white mb-2">{movie.title}</h1>
            <p className="text-white/60 mb-6">{movie.englishTitle}</p>

            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                <span className="text-white">{movie.rating}/10</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>2h 28min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-white mb-4">Synopsis</h2>
              <p className="text-white/70 leading-relaxed">
                {movie.description}
              </p>
              <p className="text-white/70 leading-relaxed mt-4">
                This groundbreaking film has captivated audiences worldwide with its compelling narrative, 
                stunning visuals, and powerful performances. The director's unique vision brings the story 
                to life in ways that challenge conventional storytelling.
              </p>
            </div>

            <div>
              <h2 className="text-white mb-4">Cast & Crew</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full mb-3 mx-auto" />
                    <p className="text-white text-center">Actor Name</p>
                    <p className="text-white/50 text-center">Character</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10 sticky top-24 space-y-6">
              <h3 className="text-white">Details</h3>
              
              <div>
                <p className="text-white/50 mb-2">Director</p>
                <p className="text-white">{movie.director}</p>
              </div>

              <div>
                <p className="text-white/50 mb-2">Release Year</p>
                <p className="text-white">{movie.year}</p>
              </div>

              <div>
                <p className="text-white/50 mb-2">Rating</p>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white">{movie.rating}/10</span>
                </div>
              </div>

              <div>
                <p className="text-white/50 mb-2">Genre</p>
                <div className="flex flex-wrap gap-2">
                  {movie.genre.map(genre => (
                    <Badge key={genre} variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-white/50 mb-2">Language</p>
                <p className="text-white">English</p>
              </div>

              <div>
                <p className="text-white/50 mb-2">Country</p>
                <p className="text-white">United States</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
