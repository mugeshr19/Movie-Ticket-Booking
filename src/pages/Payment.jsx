import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Smartphone, Wallet, Shield, CheckCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import toast from 'react-hot-toast';

export default function Payment() {
  const navigate = useNavigate();
  const { 
    selectedMovie, 
    selectedTheatre, 
    selectedShow, 
    selectedSeats, 
    totalPrice,
    addBooking 
  } = useBooking();
  
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  useEffect(() => {
    if (!selectedMovie || !selectedTheatre || !selectedShow || selectedSeats.length === 0) {
      navigate('/');
      return;
    }
  }, [selectedMovie, selectedTheatre, selectedShow, selectedSeats, navigate]);

  const convenienceFee = Math.round(totalPrice * 0.1);
  const taxes = Math.round((totalPrice + convenienceFee) * 0.18);
  const finalAmount = totalPrice + convenienceFee + taxes;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (paymentMethod === 'upi') {
      if (!formData.upiId) {
        toast.error('Please enter UPI ID');
        return false;
      }
    } else if (paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardName) {
        toast.error('Please fill all card details');
        return false;
      }
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Add booking to history
    const booking = {
      id: `BK${Date.now()}`,
      movie: selectedMovie,
      theatre: selectedTheatre,
      show: selectedShow,
      seats: selectedSeats,
      amount: finalAmount,
      date: new Date().toISOString(),
      status: 'confirmed'
    };
    
    addBooking(booking);
    
    // Navigate to confirmation after animation
    setTimeout(() => {
      navigate('/booking-confirmation', { state: { booking } });
    }, 2000);
  };

  if (!selectedMovie || !selectedTheatre || !selectedShow || selectedSeats.length === 0) {
    return null;
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={48} className="text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold mb-2"
          >
            Payment Successful!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400"
          >
            Redirecting to booking confirmation...
          </motion.p>
        </motion.div>
      </div>
    );
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
            onClick={() => navigate('/booking-summary')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Payment</h1>
            <p className="text-gray-400">Complete your booking</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
              
              <div className="space-y-3">
                {[
                  { id: 'upi', icon: Smartphone, label: 'UPI', desc: 'Pay using UPI ID' },
                  { id: 'card', icon: CreditCard, label: 'Credit/Debit Card', desc: 'Visa, Mastercard, Rupay' },
                  { id: 'wallet', icon: Wallet, label: 'Digital Wallet', desc: 'Paytm, PhonePe, GPay' }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full p-4 rounded-lg border transition-all text-left ${
                      paymentMethod === method.id
                        ? 'border-accent bg-accent/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <method.icon size={20} />
                      <div>
                        <div className="font-medium">{method.label}</div>
                        <div className="text-sm text-gray-400">{method.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
              
              {paymentMethod === 'upi' && (
                <div>
                  <label className="block text-sm font-medium mb-2">UPI ID</label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    placeholder="example@upi"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-accent focus:outline-none"
                  />
                </div>
              )}
              
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-accent focus:outline-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-accent focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              )}
              
              {paymentMethod === 'wallet' && (
                <div className="text-center py-8">
                  <Wallet size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400">You will be redirected to your wallet app</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6 h-fit"
          >
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>{selectedMovie.title}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{selectedTheatre.name}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Convenience Fee</span>
                <span>₹{convenienceFee}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Taxes</span>
                <span>₹{taxes}</span>
              </div>
              
              <hr className="border-gray-700" />
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{finalAmount}</span>
              </div>
            </div>
            
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                `Pay ₹${finalAmount}`
              )}
            </button>
            
            <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-gray-400">
              <Shield size={16} />
              <span>Secure payment powered by 256-bit SSL</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}