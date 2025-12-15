
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Menu, X, User } from 'lucide-react';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleSignIn = (userData) => {
    setUser(userData);
  };

  const handleSignUp = (userData) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-accent">
            CineMax
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-1 text-gray-300">
              <MapPin size={16} />
              <span className="text-sm">Mumbai</span>
            </div>

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

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  <User size={16} />
                  <span>{user.name}</span>
                </div>
                <button 
                  onClick={handleSignOut}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setIsSignInOpen(true)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setIsSignUpOpen(true)}
                  className="btn-primary"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
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
                  <span className="text-gray-300">{user.name}</span>
                  <button 
                    onClick={handleSignOut}
                    className="text-gray-300 hover:text-white"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setIsSignInOpen(true)}
                    className="text-gray-300 hover:text-white"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => setIsSignUpOpen(true)}
                    className="btn-primary"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <SignIn 
          isOpen={isSignInOpen} 
          onClose={() => setIsSignInOpen(false)}
          onSignIn={handleSignIn}
          onSwitchToSignUp={() => {
            setIsSignInOpen(false);
            setIsSignUpOpen(true);
          }}
        />
        <SignUp 
          isOpen={isSignUpOpen} 
          onClose={() => setIsSignUpOpen(false)}
          onSignUp={handleSignUp}
          onSwitchToSignIn={() => {
            setIsSignUpOpen(false);
            setIsSignInOpen(true);
          }}
        />
      </div>
    </nav>
  );
}