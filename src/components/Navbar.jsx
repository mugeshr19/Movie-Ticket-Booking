import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, User, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, setUser } = useBooking();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleLogin = () => {
    setUser({ name: 'John Doe', email: 'john@example.com' });
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 border-b border-red-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-accent"
            >
              CineMax
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Location */}
            <div className="flex items-center space-x-1 text-gray-300">
              <MapPin size={16} />
              <span className="text-sm">Mumbai</span>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg border border-gray-700 focus:border-accent focus:outline-none w-64"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </form>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                  <User size={16} />
                  <span>{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="text-gray-300 hover:text-white">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={handleLogin} className="btn-primary">
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-gray-800"
          >
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-accent focus:outline-none"
              />
            </form>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-gray-300">
                <MapPin size={16} />
                <span className="text-sm">Mumbai</span>
              </div>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="text-gray-300">Profile</Link>
                  <button onClick={handleLogout} className="text-gray-300">Logout</button>
                </div>
              ) : (
                <button onClick={handleLogin} className="btn-primary">
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}