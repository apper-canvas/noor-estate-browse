import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import Header from "@/components/organisms/Header";
import Browse from "@/components/pages/Browse";
import PropertyDetail from "@/components/pages/PropertyDetail";
import Favorites from "@/components/pages/Favorites";
import Compare from "@/components/pages/Compare";
import favoriteService from "@/services/api/favoriteService";
import comparisonService from "@/services/api/comparisonService";

function App() {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [comparisonCount, setComparisonCount] = useState(0);

  useEffect(() => {
    loadCounts();
    const interval = setInterval(loadCounts, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadCounts = async () => {
    try {
      const [favorites, comparison] = await Promise.all([
        favoriteService.getAll(),
        comparisonService.getAll()
      ]);
      setFavoritesCount(favorites.length);
      setComparisonCount(comparison.length);
    } catch (err) {
      console.error("Failed to load counts:", err);
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background font-body">
        <Header 
          favoritesCount={favoritesCount}
          comparisonCount={comparisonCount}
        />
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;