import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ImageGallery from "@/components/organisms/ImageGallery";
import PropertyCard from "@/components/molecules/PropertyCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import propertyService from "@/services/api/propertyService";
import favoriteService from "@/services/api/favoriteService";
import comparisonService from "@/services/api/comparisonService";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [comparison, setComparison] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProperty();
    loadFavorites();
    loadComparison();
  }, [id]);

  const loadProperty = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getById(id);
      setProperty(data);
      
      const allProperties = await propertyService.getAll();
      const similar = allProperties
        .filter(p => p.Id !== data.Id && p.propertyType === data.propertyType)
        .slice(0, 3);
      setSimilarProperties(similar);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load property details");
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

  const handleToggleFavorite = async () => {
    try {
      await favoriteService.toggle(property.Id);
      await loadFavorites();
      const isFavorite = favorites.includes(property.Id);
      toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
    } catch (err) {
      toast.error("Failed to update favorites");
    }
  };

  const handleToggleCompare = async () => {
    try {
      await comparisonService.toggle(property.Id);
      await loadComparison();
      const isInComparison = comparison.includes(property.Id);
      toast.success(isInComparison ? "Removed from comparison" : "Added to comparison");
    } catch (err) {
      toast.error(err.message || "Failed to update comparison");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) return <Loading type="detail" />;
  if (error) return <Error message={error} onRetry={loadProperty} />;
  if (!property) return <Error message="Property not found" />;

  const isFavorite = favorites.includes(property.Id);
  const isInComparison = comparison.includes(property.Id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ApperIcon name="ArrowLeft" size={20} />
        Back to Browse
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <ImageGallery images={property.images} title={property.title} />
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-card p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <Badge variant="primary">{property.propertyType}</Badge>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleFavorite}
                >
                  <ApperIcon 
                    name="Heart" 
                    size={20}
                    className={isFavorite ? "fill-accent text-accent" : ""}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleCompare}
                >
                  <ApperIcon 
                    name="GitCompare" 
                    size={20}
                    className={isInComparison ? "text-primary" : ""}
                  />
                </Button>
              </div>
            </div>

            <div>
              <p className="text-4xl font-display font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
                {formatPrice(property.price)}
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <ApperIcon name="MapPin" size={16} />
                {property.location.address}, {property.location.city}, {property.location.state} {property.location.zip}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <ApperIcon name="Bed" size={24} className="text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
                <p className="text-sm text-gray-600">Bedrooms</p>
              </div>
              <div className="text-center">
                <ApperIcon name="Bath" size={24} className="text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
                <p className="text-sm text-gray-600">Bathrooms</p>
              </div>
              <div className="text-center">
                <ApperIcon name="Maximize" size={24} className="text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{property.sqft.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Sqft</p>
              </div>
            </div>

            <div className="pt-4 border-t space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Year Built</span>
                <span className="font-semibold">{property.yearBuilt}</span>
              </div>
              {property.lotSize > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Lot Size</span>
                  <span className="font-semibold">{property.lotSize} acres</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Listed</span>
                <span className="font-semibold">
                  {format(new Date(property.listingDate), "MMM dd, yyyy")}
                </span>
              </div>
            </div>

            <Button variant="accent" className="w-full" size="lg">
              <ApperIcon name="Phone" size={20} />
              Contact Agent
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-xl p-6 border border-primary/10"
          >
            <h3 className="font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ApperIcon name="User" size={20} className="text-primary" />
              Agent Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-900">{property.agentInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-900">{property.agentInfo.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{property.agentInfo.email}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-card p-8"
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ApperIcon name="FileText" size={24} className="text-primary" />
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-card p-8"
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ApperIcon name="CheckCircle" size={24} className="text-primary" />
              Features & Amenities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-transparent rounded-lg">
                  <ApperIcon name="Check" size={20} className="text-primary flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {similarProperties.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            Similar Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((similar) => (
              <PropertyCard
                key={similar.Id}
                property={similar}
                isFavorite={favorites.includes(similar.Id)}
                isInComparison={comparison.includes(similar.Id)}
                onToggleFavorite={handleToggleFavorite}
                onToggleCompare={handleToggleCompare}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PropertyDetail;