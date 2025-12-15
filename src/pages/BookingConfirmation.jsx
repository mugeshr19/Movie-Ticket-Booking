import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Calendar, Clock, MapPin, Users, Share2, Home } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState('');
  const booking = location.state?.booking;

  useEffect(() => {
    if (!booking) {
      navigate('/');
      return;
    }

    // Generate QR code (using a placeholder)
    setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${booking.id}`);
  }, [booking, navigate]);

  const handleDownloadTicket = () => {
    toast.success('Ticket downloaded successfully!');
  };

  const handleShareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Movie Ticket Booking',
        text: `I just booked tickets for ${booking.movie.title}!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Booking link copied to clipboard!');
    }
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Booking not found</h2>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle size={40} className="text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold mb-2"
          >
            Booking Confirmed!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400"
          >
            Your tickets have been booked successfully
          </motion.p>
        </motion.div>

        {/* Ticket */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card p-0 overflow-hidden mb-8"
        >
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-accent to-yellow-500 p-6 text-black">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{booking.movie.title}</h2>
                <p className="opacity-80">Booking ID: {booking.id}</p>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-80">Total Amount</div>
                <div className="text-2xl font-bold">₹{booking.amount}</div>
              </div>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Booking Details */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="text-accent mt-1" size={20} />
                  <div>
                    <div className="font-medium">Date & Time</div>
                    <div className="text-gray-400">
                      {new Date(booking.date).toLocaleDateString('en', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="text-gray-400">{booking.show.time}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="text-accent mt-1" size={20} />
                  <div>
                    <div className="font-medium">Theatre</div>
                    <div className="text-gray-400">{booking.theatre.name}</div>
                    <div className="text-gray-400">{booking.theatre.location}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="text-accent mt-1" size={20} />
                  <div>
                    <div className="font-medium">Seats</div>
                    <div className="text-gray-400">
                      {booking.seats.map(seat => seat.id).join(', ')}
                    </div>
                    <div className="text-gray-400">
                      {booking.seats.length} seat{booking.seats.length > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-lg mb-4">
                  <img
                    src={qrCode}
                    alt="QR Code"
                    className="w-32 h-32"
                  />
                </div>
                <p className="text-sm text-gray-400 text-center">
                  Show this QR code at the theatre entrance
                </p>
              </div>
            </div>
          </div>

          {/* Ticket Footer */}
          <div className="bg-gray-800 p-4 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownloadTicket}
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
              >
                <Download size={16} />
                <span>Download Ticket</span>
              </button>
              
              <button
                onClick={handleShareBooking}
                className="flex-1 btn-secondary flex items-center justify-center space-x-2"
              >
                <Share2 size={16} />
                <span>Share Booking</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate('/profile')}
            className="btn-secondary"
          >
            View All Bookings
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="btn-primary flex items-center space-x-2"
          >
            <Home size={16} />
            <span>Book More Tickets</span>
          </button>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-8 card p-6"
        >
          <h3 className="font-semibold mb-4">Important Notes:</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Please arrive at the theatre at least 30 minutes before the show time</li>
            <li>• Carry a valid ID proof along with the ticket</li>
            <li>• Outside food and beverages are not allowed</li>
            <li>• Tickets once booked cannot be cancelled or refunded</li>
            <li>• Show this QR code or booking confirmation at the entrance</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}