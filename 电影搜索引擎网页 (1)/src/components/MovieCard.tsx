import { Star, Calendar, User } from 'lucide-react';
import { Card, CardContent } from './ui/card';
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

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <Card 
      onClick={onClick}
      className="group overflow-hidden bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
    >
      <div className="aspect-[2/3] overflow-hidden relative">
        <ImageWithFallback
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* 评分徽章 */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white">{movie.rating}</span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-white mb-1 line-clamp-1">{movie.title}</h3>
        <p className="text-white/50 mb-3">{movie.englishTitle}</p>
        
        <div className="flex items-center gap-4 mb-3 text-white/60">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{movie.year}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span className="line-clamp-1">{movie.director}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {movie.genre.map(genre => (
            <Badge key={genre} variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {genre}
            </Badge>
          ))}
        </div>
        
        <p className="text-white/60 line-clamp-2">
          {movie.description}
        </p>
      </CardContent>
    </Card>
  );
}