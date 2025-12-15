// Done by Person-6: Route configuration and navigation setup
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}