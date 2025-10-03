import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import PropertyCard from "@/components/molecules/PropertyCard";
import FilterPanel from "@/components/organisms/FilterPanel";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import propertyService from "@/services/api/propertyService";
import favoriteService from "@/services/api/favoriteService";
import comparisonService from "@/services/api/comparisonService";

const Browse = () => {
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [comparison, setComparison] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 5000000 },
    location: "",
    propertyTypes: [],
    bedrooms: 0,
    bathrooms: 0,
    sqftRange: { min: 0, max: 10000 },
    sortBy: "date-desc"
  });

  useEffect(() => {
    loadProperties();
    loadFavorites();
    loadComparison();
  }, []);

  useEffect(() => {
    if (!loading) {
      loadProperties();
    }
  }, [filters]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.search(filters);
      setProperties(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const data = await favoriteService.getAll();
      setFavorites(data);
    } catch (err) {
      console.error("Failed to load favorites:", err);
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
      const isFavorite = favorites.includes(propertyId);
      toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
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

  const handleSearch = (query) => {
    setFilters({ ...filters, location: query });
  };

  const handleSortChange = (sortBy) => {
    setFilters({ ...filters, sortBy });
  };

  const handleClearFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 5000000 },
      location: "",
      propertyTypes: [],
      bedrooms: 0,
      bathrooms: 0,
      sqftRange: { min: 0, max: 10000 },
      sortBy: "date-desc"
    });
  };

  if (loading) return <Loading type="grid" />;
  if (error) return <Error message={error} onRetry={loadProperties} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
              Browse Properties
            </h1>
            <p className="text-gray-600">
              Showing {properties.length} {properties.length === 1 ? "property" : "properties"}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            >
              <ApperIcon name={viewMode === "grid" ? "List" : "Grid"} size={20} />
              {viewMode === "grid" ? "List" : "Grid"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsFilterOpen(true)}
              className="md:hidden"
            >
              <ApperIcon name="SlidersHorizontal" size={20} />
              Filters
            </Button>
          </div>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm text-gray-600">Sort by:</span>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "date-desc", label: "Newest" },
              { value: "price-asc", label: "Price: Low to High" },
              { value: "price-desc", label: "Price: High to Low" },
              { value: "sqft-desc", label: "Largest" }
            ].map((option) => (
              <Button
                key={option.value}
                variant={filters.sortBy === option.value ? "primary" : "ghost"}
                size="sm"
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <aside className="hidden md:block w-80 flex-shrink-0">
          <div className="sticky top-24">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          {properties.length === 0 ? (
            <Empty
              title="No Properties Found"
              message="Try adjusting your filters or search criteria to find more properties."
              action={handleClearFilters}
              actionLabel="Clear All Filters"
            />
          ) : (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              : "space-y-6"
            }>
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
        </main>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 md:hidden overflow-y-auto"
            >
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                onClose={() => setIsFilterOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Browse;