# 🎬 CineMax - Movie Ticket Booking System

A modern, responsive movie ticket booking application built with React.js, featuring a premium UI similar to BookMyShow.

## ✨ Features

### 🎯 Core Functionality
- **Movie Browsing**: Browse now showing and upcoming movies
- **Advanced Search & Filters**: Search by name, filter by language and genre
- **Theatre Selection**: Choose from multiple theatres with show timings
- **Interactive Seat Selection**: Visual seat map with different categories
- **Secure Payment**: Multiple payment methods (UPI, Card, Wallet)
- **Booking Management**: Complete booking flow with confirmation
- **User Profile**: Booking history and user management

### 🎨 UI/UX Features
- **Dark Theme**: Cinema-style dark theme with accent colors
- **Responsive Design**: Mobile-first approach, works on all devices
- **Smooth Animations**: Framer Motion powered transitions
- **Modern Components**: Card-based layout with shadows and rounded corners
- **Loading States**: Skeleton loaders for better UX
- **Toast Notifications**: Real-time feedback for user actions

### 📱 Pages Implemented
1. **Home Page** - Hero carousel, movie sections, search & filters
2. **Movie Details** - Movie info, trailer modal, booking CTA
3. **Theatre Selection** - Date picker, theatre list, show timings
4. **Seat Selection** - Interactive seat map, real-time pricing
5. **Booking Summary** - Order review, price breakdown
6. **Payment** - Multiple payment methods, secure processing
7. **Booking Confirmation** - QR code, ticket download, sharing
8. **User Profile** - Booking history, user statistics

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Context API
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Movie-ticket
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── MovieCard.jsx
│   ├── HeroCarousel.jsx
│   └── SkeletonLoader.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── MovieDetails.jsx
│   ├── TheatreSelection.jsx
│   ├── SeatSelection.jsx
│   ├── BookingSummary.jsx
│   ├── Payment.jsx
│   ├── BookingConfirmation.jsx
│   └── Profile.jsx
├── context/            # State management
│   └── BookingContext.jsx
├── data/               # Sample data
│   └── movies.js
├── routes/             # Routing configuration
│   └── AppRoutes.jsx
├── assets/             # Static assets
├── App.jsx             # Main app component
└── main.jsx           # Entry point
```

## 🎯 Key Features Breakdown

### State Management
- **Context API** for global state management
- **Persistent booking flow** across pages
- **User authentication** state
- **Booking history** management

### Responsive Design
- **Mobile-first** approach
- **Flexible grid** layouts
- **Touch-friendly** interactions
- **Optimized** for all screen sizes

### Performance Optimizations
- **Lazy loading** for images
- **Skeleton loaders** for better perceived performance
- **Optimized animations** with Framer Motion
- **Efficient re-renders** with proper state management

### User Experience
- **Intuitive navigation** flow
- **Real-time feedback** with toast notifications
- **Loading states** for all async operations
- **Error handling** with user-friendly messages

## 🎨 Design System

### Colors
- **Primary**: Gray-900 (Dark background)
- **Secondary**: Gray-800 (Card backgrounds)
- **Accent**: Amber-500 (CTA buttons, highlights)
- **Success**: Green-500 (Success states)
- **Error**: Red-500 (Error states)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Hover effects, loading states
- **Forms**: Focus states, validation feedback
- **Navigation**: Sticky header, mobile menu

## 🔧 Customization

### Adding New Movies
Edit `src/data/movies.js` to add new movies with the following structure:
```javascript
{
  id: number,
  title: string,
  poster: string,
  backdrop: string,
  rating: number,
  genre: string[],
  duration: string,
  language: string[],
  releaseDate: string,
  description: string,
  trailer: string,
  nowShowing: boolean
}
```

### Modifying Seat Layout
Edit `src/data/movies.js` to customize seat categories and pricing:
```javascript
export const seatLayout = {
  silver: { rows: ['A', 'B'], seatsPerRow: 12, price: 150 },
  gold: { rows: ['C', 'D'], seatsPerRow: 10, price: 200 },
  platinum: { rows: ['E', 'F'], seatsPerRow: 8, price: 300 }
};
```

### Theme Customization
Modify `tailwind.config.js` to customize colors, fonts, and other design tokens.

## 📱 Mobile Experience

The application is fully responsive and provides an excellent mobile experience:
- **Touch-optimized** seat selection
- **Swipe-friendly** carousels
- **Mobile-first** navigation
- **Optimized** form inputs
- **Fast loading** on mobile networks

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure redirects for SPA

### Other Platforms
The built files in the `dist` folder can be deployed to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎉 Acknowledgments

- **Design Inspiration**: BookMyShow
- **Icons**: Lucide React
- **Images**: Unsplash (for demo purposes)
- **Fonts**: Google Fonts (Inter)

---

**Built with ❤️ using React.js and modern web technologies**