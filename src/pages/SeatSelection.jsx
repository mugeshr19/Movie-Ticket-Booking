import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users } from 'lucide-react';
import { seatLayout } from '../data/movies';
import { useBooking } from '../context/BookingContext';
import toast from 'react-hot-toast';

export default function SeatSelection() {
  const navigate = useNavigate();
  const { selectedMovie, selectedTheatre, selectedShow, selectedSeats, setSeats } = useBooking();
  const [occupiedSeats, setOccupiedSeats] = useState(new Set());

  useEffect(() => {
    if (!selectedMovie || !selectedTheatre || !selectedShow) {
      navigate('/');
      return;
    }

    // Generate random occupied seats
    const occupied = new Set();
    Object.entries(seatLayout).forEach(([category, config]) => {
      config.rows.forEach(row => {
        for (let i = 1; i <= config.seatsPerRow; i++) {
          if (Math.random() < 0.3) { // 30% chance of being occupied
            occupied.add(`${row}${i}`);
          }
        }
      });
    });
    setOccupiedSeats(occupied);
  }, [selectedMovie, selectedTheatre, selectedShow, navigate]);

  const handleSeatClick = (seatId, category, price) => {
    if (occupiedSeats.has(seatId)) {
      toast.error('This seat is already occupied');
      return;
    }

    const isSelected = selectedSeats.some(seat => seat.id === seatId);
    
    if (isSelected) {
      setSeats(selectedSeats.filter(seat => seat.id !== seatId));
    } else {
      if (selectedSeats.length >= 10) {
        toast.error('Maximum 10 seats can be selected');
        return;
      }
      setSeats([...selectedSeats, { id: seatId, category, price }]);
    }
  };

  const getSeatStatus = (seatId) => {
    if (occupiedSeats.has(seatId)) return 'occupied';
    if (selectedSeats.some(seat => seat.id === seatId)) return 'selected';
    return 'available';
  };

  const getSeatColor = (status) => {
    switch (status) {
      case 'occupied': return 'bg-red-500 cursor-not-allowed';
      case 'selected': return 'bg-accent';
      case 'available': return 'bg-gray-600 hover:bg-gray-500';
      default: return 'bg-gray-600';
    }
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }
    navigate('/booking-summary');
  };

  if (!selectedMovie || !selectedTheatre || !selectedShow) return null;

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4 mb-8"
        >
          <button
            onClick={() => navigate('/theatres')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{selectedMovie.title}</h1>
            <p className="text-gray-400">
              {selectedTheatre.name} | {selectedShow.time} | {new Date().toLocaleDateString()}
            </p>
          </div>
        </motion.div>

        {/* Screen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 h-2 rounded-full mb-2 mx-auto max-w-md" />
          <p className="text-gray-400 text-sm">SCREEN</p>
        </motion.div>

        {/* Seat Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 mb-8"
        >
          {Object.entries(seatLayout).map(([category, config]) => (
            <div key={category} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold capitalize">
                  {category} - ₹{config.price}
                </h3>
              </div>
              
              {config.rows.map(row => (
                <div key={row} className="flex items-center justify-center space-x-2">
                  <span className="w-8 text-center font-medium text-gray-400">{row}</span>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: config.seatsPerRow }, (_, i) => {
                      const seatNumber = i + 1;
                      const seatId = `${row}${seatNumber}`;
                      const status = getSeatStatus(seatId);
                      
                      return (
                        <motion.button
                          key={seatId}
                          whileHover={{ scale: status !== 'occupied' ? 1.1 : 1 }}
                          whileTap={{ scale: status !== 'occupied' ? 0.9 : 1 }}
                          onClick={() => handleSeatClick(seatId, category, config.price)}
                          disabled={status === 'occupied'}
                          className={`w-8 h-8 rounded-t-lg text-xs font-medium transition-all ${getSeatColor(status)}`}
                        >
                          {seatNumber}
                        </motion.button>
                      );
                    })}
                  </div>
                  
                  <span className="w-8 text-center font-medium text-gray-400">{row}</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center space-x-6 mb-8"
        >
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-600 rounded-t" />
            <span className="text-sm text-gray-400">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-accent rounded-t" />
            <span className="text-sm text-gray-400">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-t" />
            <span className="text-sm text-gray-400">Occupied</span>
          </div>
        </motion.div>

        {/* Booking Summary */}
        {selectedSeats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4"
          >
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Users size={20} />
                  <span>{selectedSeats.length} Seat{selectedSeats.length > 1 ? 's' : ''}</span>
                </div>
                <div className="text-sm text-gray-400">
                  {selectedSeats.map(seat => seat.id).join(', ')}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-400">Total Amount</div>
                  <div className="text-xl font-bold">
                    ₹{selectedSeats.reduce((total, seat) => total + seat.price, 0)}
                  </div>
                </div>
                
                <button onClick={handleProceed} className="btn-primary">
                  Proceed
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}