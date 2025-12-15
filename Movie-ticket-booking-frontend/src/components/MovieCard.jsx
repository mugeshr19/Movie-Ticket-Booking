import { motion } from 'framer-motion';
import { Star, Clock, Languages } from 'lucide-react';

export default function MovieCard({ movie, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card group cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded-lg flex items-center space-x-1">
          <Star className="text-yellow-400 fill-current" size={14} />
          <span className="text-sm font-medium">{movie.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{movie.title}</h3>
        
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Clock size={14} />
            <span>{movie.duration}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Languages size={14} />
            <span>{movie.language.join(', ')}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {movie.genre.slice(0, 2).map((g) => (
              <span key={g} className="bg-gray-700 px-2 py-1 rounded text-xs">
                {g}
              </span>
            ))}
          </div>
        </div>
        
        <button className="w-full mt-4 btn-primary">
          Book Tickets
        </button>
      </div>
    </motion.div>
  );
}