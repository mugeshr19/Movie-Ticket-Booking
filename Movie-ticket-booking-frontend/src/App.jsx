// Done by Person-6: Main App component setup and routing configuration
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;