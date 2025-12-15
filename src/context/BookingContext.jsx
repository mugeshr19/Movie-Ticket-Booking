import { createContext, useContext, useReducer } from 'react';

const BookingContext = createContext();

const initialState = {
  selectedMovie: null,
  selectedTheatre: null,
  selectedShow: null,
  selectedSeats: [],
  bookingDate: new Date().toISOString().split('T')[0],
  totalPrice: 0,
  user: null,
  bookingHistory: []
};

function bookingReducer(state, action) {
  switch (action.type) {
    case 'SET_MOVIE':
      return { ...state, selectedMovie: action.payload };
    case 'SET_THEATRE':
      return { ...state, selectedTheatre: action.payload };
    case 'SET_SHOW':
      return { ...state, selectedShow: action.payload };
    case 'SET_SEATS':
      return { 
        ...state, 
        selectedSeats: action.payload,
        totalPrice: action.payload.reduce((total, seat) => total + seat.price, 0)
      };
    case 'SET_DATE':
      return { ...state, bookingDate: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_BOOKING':
      return { 
        ...state, 
        bookingHistory: [...state.bookingHistory, action.payload],
        selectedMovie: null,
        selectedTheatre: null,
        selectedShow: null,
        selectedSeats: [],
        totalPrice: 0
      };
    case 'RESET_BOOKING':
      return { 
        ...state,
        selectedMovie: null,
        selectedTheatre: null,
        selectedShow: null,
        selectedSeats: [],
        totalPrice: 0
      };
    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const setMovie = (movie) => dispatch({ type: 'SET_MOVIE', payload: movie });
  const setTheatre = (theatre) => dispatch({ type: 'SET_THEATRE', payload: theatre });
  const setShow = (show) => dispatch({ type: 'SET_SHOW', payload: show });
  const setSeats = (seats) => dispatch({ type: 'SET_SEATS', payload: seats });
  const setDate = (date) => dispatch({ type: 'SET_DATE', payload: date });
  const setUser = (user) => dispatch({ type: 'SET_USER', payload: user });
  const addBooking = (booking) => dispatch({ type: 'ADD_BOOKING', payload: booking });
  const resetBooking = () => dispatch({ type: 'RESET_BOOKING' });

  return (
    <BookingContext.Provider value={{
      ...state,
      setMovie,
      setTheatre,
      setShow,
      setSeats,
      setDate,
      setUser,
      addBooking,
      resetBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};