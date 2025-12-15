import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Calendar, Languages, Play, X } from 'lucide-react';
import { movies } from '../data/movies';
import { useBooking } from '../context/BookingContext';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setMovie } = useBooking();
  const [movie, setMovieData] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const movieData = movies.find(m => m.id === parseInt(id));
    setMovieData(movieData);
  }, [id]);

  const handleBookTickets = () => {
    setMovie(movie);
    navigate('/theatres');
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
          
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
              <div className="flex flex-col md:flex-row items-start md:items-end space-y-6 md:space-y-0 md:space-x-8">
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={movie.poster}
                  alt={movie.title}
                  className="w-48 h-72 object-cover rounded-xl shadow-2xl"
                />
                
                <div className="flex-1">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-4"
                  >
                    {movie.title}
                  </motion.h1>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap items-center gap-4 mb-4"
                  >
                    <div className="flex items-center space-x-1 bg-yellow-500 text-black px-3 py-1 rounded-full">
                      <Star className="fill-current" size={16} />
                      <span className="font-semibold">{movie.rating}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-gray-300">
                      <Clock size={16} />
                      <span>{movie.duration}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-gray-300">
                      <Calendar size={16} />
                      <span>{new Date(movie.releaseDate).getFullYear()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-gray-300">
                      <Languages size={16} />
                      <span>{movie.language.join(', ')}</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-2 mb-4"
                  >
                    {movie.genre.map((g) => (
                      <span key={g} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                        {g}
                      </span>
                    ))}
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex space-x-4"
                  >
                    <button onClick={handleBookTickets} className="btn-primary">
                      Book Tickets
                    </button>
                    <button
                      onClick={() => setShowTrailer(true)}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <Play size={16} />
                      <span>Watch Trailer</span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">About the Movie</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {movie.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Release Date</h3>
                <p className="text-gray-300">{new Date(movie.releaseDate).toLocaleDateString()}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Duration</h3>
                <p className="text-gray-300">{movie.duration}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Languages</h3>
                <p className="text-gray-300">{movie.language.join(', ')}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Genres</h3>
                <p className="text-gray-300">{movie.genre.join(', ')}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4">Book Your Tickets</h3>
            <p className="text-gray-300 mb-6">
              Experience this amazing movie in the best theatres near you.
            </p>
            <button onClick={handleBookTickets} className="w-full btn-primary">
              Book Now
            </button>
          </div>
        </motion.div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowTrailer(false)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
            >
              <X size={20} />
            </button>
            
            <iframe
              src={movie.trailer}
              title="Movie Trailer"
              className="w-full h-full"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}