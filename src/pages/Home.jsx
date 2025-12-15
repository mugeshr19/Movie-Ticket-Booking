import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import MovieCard from '../components/MovieCard';
import { MovieCardSkeleton, HeroSkeleton } from '../components/SkeletonLoader';
import { movies } from '../data/movies';

export default function Home() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [filters, setFilters] = useState({
    language: '',
    genre: '',
    search: searchParams.get('search') || ''
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = movies;

    if (filters.search) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.language) {
      filtered = filtered.filter(movie =>
        movie.language.includes(filters.language)
      );
    }

    if (filters.genre) {
      filtered = filtered.filter(movie =>
        movie.genre.includes(filters.genre)
      );
    }

    setFilteredMovies(filtered);
  }, [filters]);

  const nowShowing = filteredMovies.filter(movie => movie.nowShowing);
  const upcoming = filteredMovies.filter(movie => !movie.nowShowing);

  const languages = [...new Set(movies.flatMap(movie => movie.language))];
  const genres = [...new Set(movies.flatMap(movie => movie.genre))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <HeroSkeleton />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <HeroCarousel movies={movies} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Filter size={20} />
            <h2 className="text-xl font-semibold">Filters</h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={filters.language}
              onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value }))}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none"
            >
              <option value="">All Languages</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            
            <select
              value={filters.genre}
              onChange={(e) => setFilters(prev => ({ ...prev, genre: e.target.value }))}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none"
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            
            {(filters.language || filters.genre || filters.search) && (
              <button
                onClick={() => setFilters({ language: '', genre: '', search: '' })}
                className="text-accent hover:text-accent/80"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Now Showing */}
        {nowShowing.length > 0 && (
          <section className="mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold mb-6"
            >
              Now Showing
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {nowShowing.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Movies */}
        {upcoming.length > 0 && (
          <section>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold mb-6"
            >
              Coming Soon
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {upcoming.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          </section>
        )}

        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No movies found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}