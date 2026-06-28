import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Import all pages
import HomePage from './pages/HomePage';
import GeneratePage from './pages/GeneratePage';
import GalleryPage from './pages/GalleryPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import ContactPage from './pages/ContactPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/generate" element={<GeneratePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
