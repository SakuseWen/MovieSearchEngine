import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Filter } from 'lucide-react';

interface FilterSectionProps {
  allGenres: string[];
  selectedGenres: string[];
  onGenresChange: (genres: string[]) => void;
  yearRange: [number, number];
  onYearRangeChange: (range: [number, number]) => void;
  sortBy: 'rating' | 'year' | 'title';
  onSortByChange: (sortBy: 'rating' | 'year' | 'title') => void;
}

export function FilterSection({
  allGenres,
  selectedGenres,
  onGenresChange,
  yearRange,
  onYearRangeChange,
  sortBy,
  onSortByChange
}: FilterSectionProps) {
  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      onGenresChange(selectedGenres.filter(g => g !== genre));
    } else {
      onGenresChange([...selectedGenres, genre]);
    }
  };

  return (
    <div className="space-y-6 sticky top-32">
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 排序 */}
          <div>
            <Label className="text-white mb-2 block">Sort By</Label>
            <Select value={sortBy} onValueChange={(value: any) => onSortByChange(value)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="year">Newest First</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 类型筛选 */}
          <div>
            <Label className="text-white mb-3 block">Genre</Label>
            <div className="space-y-3">
              {allGenres.map(genre => (
                <div key={genre} className="flex items-center gap-2">
                  <Checkbox
                    id={`genre-${genre}`}
                    checked={selectedGenres.includes(genre)}
                    onCheckedChange={() => handleGenreToggle(genre)}
                    className="border-white/30 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <Label
                    htmlFor={`genre-${genre}`}
                    className="text-white/80 cursor-pointer"
                  >
                    {genre}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* 年份范围 */}
          <div>
            <Label className="text-white mb-3 block">
              Year Range: {yearRange[0]} - {yearRange[1]}
            </Label>
            <Slider
              value={yearRange}
              onValueChange={(value) => onYearRangeChange(value as [number, number])}
              min={1970}
              max={2025}
              step={1}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}