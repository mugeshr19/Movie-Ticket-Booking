import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Pages
import Home from '../pages/Home';
import MovieDetails from '../pages/MovieDetails';
import TheatreSelection from '../pages/TheatreSelection';
import SeatSelection from '../pages/SeatSelection';
import BookingSummary from '../pages/BookingSummary';
import Payment from '../pages/Payment';
import BookingConfirmation from '../pages/BookingConfirmation';
import Profile from '../pages/Profile';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3
};

function AnimatedRoute({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedRoute><Home /></AnimatedRoute>} />
        <Route path="/movie/:id" element={<AnimatedRoute><MovieDetails /></AnimatedRoute>} />
        <Route path="/theatres" element={<AnimatedRoute><TheatreSelection /></AnimatedRoute>} />
        <Route path="/seats" element={<AnimatedRoute><SeatSelection /></AnimatedRoute>} />
        <Route path="/booking-summary" element={<AnimatedRoute><BookingSummary /></AnimatedRoute>} />
        <Route path="/payment" element={<AnimatedRoute><Payment /></AnimatedRoute>} />
        <Route path="/booking-confirmation" element={<AnimatedRoute><BookingConfirmation /></AnimatedRoute>} />
        <Route path="/profile" element={<AnimatedRoute><Profile /></AnimatedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}