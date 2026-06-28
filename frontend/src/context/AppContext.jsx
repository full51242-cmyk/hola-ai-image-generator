import { createContext, useContext, useState, useEffect } from 'react';

// Create context for app state
const AppContext = createContext();

// App state provider component
export function AppProvider({ children }) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Theme state
  const [darkMode, setDarkMode] = useState(false);
  
  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // User data state
  const [userCredits, setUserCredits] = useState(10);
  const [generationHistory, setGenerationHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  // Loading state
  const [loading, setLoading] = useState(false);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Login function
  const login = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  // Deduct credits function
  const deductCredits = (amount) => {
    if (userCredits >= amount) {
      setUserCredits(userCredits - amount);
      return true;
    }
    return false;
  };

  // Add to favorites function
  const addToFavorites = (image) => {
    if (!favorites.find(fav => fav.id === image.id)) {
      setFavorites([...favorites, image]);
    }
  };

  // Remove from favorites function
  const removeFromFavorites = (imageId) => {
    setFavorites(favorites.filter(fav => fav.id !== imageId));
  };

  // Add to history function
  const addToHistory = (generation) => {
    setGenerationHistory([generation, ...generationHistory]);
  };

  // Context value object
  const value = {
    // Auth state
    isAuthenticated,
    currentUser,
    login,
    logout,
    
    // Theme state
    darkMode,
    toggleDarkMode,
    
    // UI state
    sidebarOpen,
    setSidebarOpen,
    searchQuery,
    setSearchQuery,
    
    // User data
    userCredits,
    setUserCredits,
    generationHistory,
    favorites,
    addToFavorites,
    removeFromFavorites,
    addToHistory,
    
    // Loading
    loading,
    setLoading,
    deductCredits,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use app context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
