import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import PropertyCard from "@/components/molecules/PropertyCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import propertyService from "@/services/api/propertyService";
import favoriteService from "@/services/api/favoriteService";
import comparisonService from "@/services/api/comparisonService";

const Favorites = () => {
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [comparison, setComparison] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFavorites();
    loadComparison();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const favoriteIds = await favoriteService.getAll();
      setFavorites(favoriteIds);

      if (favoriteIds.length > 0) {
        const allProperties = await propertyService.getAll();
        const favoriteProperties = allProperties.filter(p => 
          favoriteIds.includes(p.Id)
        );
        setProperties(favoriteProperties);
      } else {
        setProperties([]);
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  const loadComparison = async () => {
    try {
      const data = await comparisonService.getAll();
      setComparison(data);
    } catch (err) {
      console.error("Failed to load comparison:", err);
    }
  };

  const handleToggleFavorite = async (propertyId) => {
    try {
      await favoriteService.toggle(propertyId);
      await loadFavorites();
      toast.success("Removed from favorites");
    } catch (err) {
      toast.error("Failed to update favorites");
    }
  };

  const handleToggleCompare = async (propertyId) => {
    try {
      await comparisonService.toggle(propertyId);
      await loadComparison();
      const isInComparison = comparison.includes(propertyId);
      toast.success(isInComparison ? "Removed from comparison" : "Added to comparison");
    } catch (err) {
      toast.error(err.message || "Failed to update comparison");
    }
  };

  if (loading) return <Loading type="grid" />;
  if (error) return <Error message={error} onRetry={loadFavorites} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-br from-accent to-accent-light p-3 rounded-xl shadow-lg">
            <ApperIcon name="Heart" size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-gray-900">
              Favorite Properties
            </h1>
            <p className="text-gray-600">
              {properties.length} {properties.length === 1 ? "property" : "properties"} saved
            </p>
          </div>
        </div>
      </motion.div>

      {properties.length === 0 ? (
        <Empty
          title="No Favorites Yet"
          message="Start exploring properties and save your favorites by clicking the heart icon."
          action={() => window.location.href = "/"}
          actionLabel="Browse Properties"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.Id}
              property={property}
              isFavorite={favorites.includes(property.Id)}
              isInComparison={comparison.includes(property.Id)}
              onToggleFavorite={handleToggleFavorite}
              onToggleCompare={handleToggleCompare}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;