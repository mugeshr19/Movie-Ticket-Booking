import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Filter, Calendar } from 'lucide-react';
import { theatres } from '../data/movies';
import { useBooking } from '../context/BookingContext';
import toast from 'react-hot-toast';

export default function TheatreSelection() {
  const navigate = useNavigate();
  const { selectedMovie, bookingDate, setTheatre, setShow, setDate } = useBooking();
  const [selectedDate, setSelectedDate] = useState(bookingDate);
  const [timeFilter, setTimeFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  useEffect(() => {
    if (!selectedMovie) {
      navigate('/');
      return;
    }
  }, [selectedMovie, navigate]);

  const handleShowSelection = (theatre, show) => {
    if (!show.available) {
      toast.error('This show is houseful!');
      return;
    }
    
    setTheatre(theatre);
    setShow(show);
    setDate(selectedDate);
    navigate('/seats');
  };

  const getFilteredShows = (shows) => {
    let filtered = shows;
    
    if (timeFilter) {
      filtered = filtered.filter(show => show.type === timeFilter);
    }
    
    if (priceFilter) {
      const maxPrice = parseInt(priceFilter);
      filtered = filtered.filter(show => show.price <= maxPrice);
    }
    
    return filtered;
  };

  const getNextDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  if (!selectedMovie) return null;

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">{selectedMovie.title}</h1>
          <p className="text-gray-400">Select your preferred theatre and show time</p>
        </motion.div>

        {/* Date Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Calendar size={20} />
            <h2 className="text-xl font-semibold">Select Date</h2>
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {getNextDates().map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                className={`flex-shrink-0 px-4 py-3 rounded-lg border transition-all ${
                  selectedDate === date.toISOString().split('T')[0]
                    ? 'bg-accent text-white border-accent'
                    : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium">
                    {date.toLocaleDateString('en', { weekday: 'short' })}
                  </div>
                  <div className="text-lg font-bold">
                    {date.getDate()}
                  </div>
                  <div className="text-xs text-gray-400">
                    {date.toLocaleDateString('en', { month: 'short' })}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Filter size={20} />
            <h2 className="text-xl font-semibold">Filters</h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none"
            >
              <option value="">All Times</option>
              <option value="morning">Morning (6AM - 12PM)</option>
              <option value="afternoon">Afternoon (12PM - 6PM)</option>
              <option value="night">Night (6PM - 12AM)</option>
            </select>
            
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent focus:outline-none"
            >
              <option value="">All Prices</option>
              <option value="200">Under ₹200</option>
              <option value="250">Under ₹250</option>
              <option value="300">Under ₹300</option>
            </select>
            
            {(timeFilter || priceFilter) && (
              <button
                onClick={() => {
                  setTimeFilter('');
                  setPriceFilter('');
                }}
                className="text-accent hover:text-accent/80"
              >
                Clear Filters
              </button>
            )}
          </div>
        </motion.div>

        {/* Theatres */}
        <div className="space-y-6">
          {theatres.map((theatre, index) => {
            const filteredShows = getFilteredShows(theatre.shows);
            
            if (filteredShows.length === 0) return null;
            
            return (
              <motion.div
                key={theatre.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{theatre.name}</h3>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <MapPin size={16} />
                      <span>{theatre.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {filteredShows.map((show, showIndex) => (
                    <motion.button
                      key={showIndex}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleShowSelection(theatre, show)}
                      disabled={!show.available}
                      className={`p-3 rounded-lg border transition-all ${
                        show.available
                          ? 'bg-gray-800 border-gray-700 hover:border-accent hover:bg-gray-700'
                          : 'bg-gray-700 border-gray-600 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Clock size={14} />
                        <span className="font-medium">{show.time}</span>
                      </div>
                      <div className="text-sm text-gray-400">₹{show.price}</div>
                      {!show.available && (
                        <div className="text-xs text-red-400 mt-1">Houseful</div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {theatres.every(theatre => getFilteredShows(theatre.shows).length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No shows available for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}