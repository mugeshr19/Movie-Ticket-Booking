import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, MapPin, Clock, Ticket, LogOut, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, bookingHistory, setUser } = useBooking();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-400';
      case 'cancelled': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <div className="flex items-center space-x-1 text-gray-400">
                  <Mail size={16} />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="btn-secondary flex items-center space-x-2"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Booking Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">{bookingHistory.length}</div>
            <div className="text-gray-400">Total Bookings</div>
          </div>
          
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {bookingHistory.filter(b => b.status === 'confirmed').length}
            </div>
            <div className="text-gray-400">Confirmed</div>
          </div>
          
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">
              ₹{bookingHistory.reduce((total, booking) => total + booking.amount, 0)}
            </div>
            <div className="text-gray-400">Total Spent</div>
          </div>
        </motion.div>

        {/* Booking History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Booking History</h2>
            <div className="flex items-center space-x-1 text-gray-400">
              <Ticket size={16} />
              <span>{bookingHistory.length} booking{bookingHistory.length !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {bookingHistory.length === 0 ? (
            <div className="text-center py-12">
              <Ticket size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
              <p className="text-gray-400 mb-6">Start by booking your first movie ticket!</p>
              <button onClick={() => navigate('/')} className="btn-primary">
                Browse Movies
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookingHistory.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-4 mb-4 md:mb-0">
                      <img
                        src={booking.movie.poster}
                        alt={booking.movie.title}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{booking.movie.title}</h3>
                        
                        <div className="space-y-1 text-sm text-gray-400">
                          <div className="flex items-center space-x-2">
                            <MapPin size={14} />
                            <span>{booking.theatre.name}, {booking.theatre.location}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Calendar size={14} />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Clock size={14} />
                            <span>{booking.show.time}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Ticket size={14} />
                            <span>{booking.seats.map(seat => seat.id).join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:flex-col md:items-end md:justify-start">
                      <div className="text-right">
                        <div className="text-lg font-bold">₹{booking.amount}</div>
                        <div className={`text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => navigate('/booking-confirmation', { state: { booking } })}
                        className="mt-2 text-accent hover:text-accent/80 flex items-center space-x-1"
                      >
                        <span>View Details</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}