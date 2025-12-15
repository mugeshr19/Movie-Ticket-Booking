import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Ticket } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function BookingSummary() {
  const navigate = useNavigate();
  const { 
    selectedMovie, 
    selectedTheatre, 
    selectedShow, 
    selectedSeats, 
    bookingDate, 
    totalPrice 
  } = useBooking();

  useEffect(() => {
    if (!selectedMovie || !selectedTheatre || !selectedShow || selectedSeats.length === 0) {
      navigate('/');
      return;
    }
  }, [selectedMovie, selectedTheatre, selectedShow, selectedSeats, navigate]);

  const convenienceFee = Math.round(totalPrice * 0.1);
  const taxes = Math.round((totalPrice + convenienceFee) * 0.18);
  const finalAmount = totalPrice + convenienceFee + taxes;

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  if (!selectedMovie || !selectedTheatre || !selectedShow || selectedSeats.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4 mb-8"
        >
          <button
            onClick={() => navigate('/seats')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Booking Summary</h1>
            <p className="text-gray-400">Review your booking details</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Movie Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={selectedMovie.poster}
                  alt={selectedMovie.title}
                  className="w-20 h-28 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">{selectedMovie.title}</h2>
                  <div className="space-y-2 text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{new Date(bookingDate).toLocaleDateString('en', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span>{selectedShow.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} />
                      <span>{selectedTheatre.name}, {selectedTheatre.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Seat Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Users size={20} />
                <h3 className="text-lg font-semibold">Selected Seats</h3>
              </div>
              
              <div className="space-y-3">
                {Object.entries(
                  selectedSeats.reduce((acc, seat) => {
                    if (!acc[seat.category]) {
                      acc[seat.category] = { seats: [], price: seat.price };
                    }
                    acc[seat.category].seats.push(seat.id);
                    return acc;
                  }, {})
                ).map(([category, data]) => (
                  <div key={category} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium capitalize">{category}</span>
                      <div className="text-sm text-gray-400">
                        {data.seats.join(', ')} ({data.seats.length} seat{data.seats.length > 1 ? 's' : ''})
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹{data.price} × {data.seats.length}</div>
                      <div className="text-sm text-gray-400">₹{data.price * data.seats.length}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Price Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6 h-fit"
          >
            <div className="flex items-center space-x-2 mb-6">
              <Ticket size={20} />
              <h3 className="text-lg font-semibold">Price Breakdown</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Ticket Price ({selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''})</span>
                <span>₹{totalPrice}</span>
              </div>
              
              <div className="flex justify-between text-gray-400">
                <span>Convenience Fee</span>
                <span>₹{convenienceFee}</span>
              </div>
              
              <div className="flex justify-between text-gray-400">
                <span>Taxes (18%)</span>
                <span>₹{taxes}</span>
              </div>
              
              <hr className="border-gray-700" />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span>₹{finalAmount}</span>
              </div>
            </div>
            
            <button
              onClick={handleProceedToPayment}
              className="w-full mt-6 btn-primary"
            >
              Proceed to Payment
            </button>
            
            <div className="mt-4 text-xs text-gray-400 text-center">
              By proceeding, you agree to our Terms & Conditions
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}