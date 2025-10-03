import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const PropertyCard = ({ property, isFavorite, onToggleFavorite, onToggleCompare, isInComparison }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleCardClick = () => {
    navigate(`/property/${property.Id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(property.Id);
  };

  const handleCompareClick = (e) => {
    e.stopPropagation();
    onToggleCompare(property.Id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteClick}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
          >
            <ApperIcon 
              name={isFavorite ? "Heart" : "Heart"} 
              size={20} 
              className={isFavorite ? "text-accent fill-accent" : "text-gray-700"}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCompareClick}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
          >
            <ApperIcon 
              name="GitCompare" 
              size={20} 
              className={isInComparison ? "text-primary" : "text-gray-700"}
            />
          </motion.button>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-3xl font-display font-bold">{formatPrice(property.price)}</p>
              <p className="text-sm flex items-center gap-1 mt-1">
                <ApperIcon name="MapPin" size={14} />
                {property.location.city}, {property.location.state}
              </p>
            </div>
            <Badge variant="primary" className="bg-white/20 backdrop-blur-sm text-white border border-white/30">
              {property.propertyType}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-display font-semibold text-gray-900 mb-4 line-clamp-1">
          {property.title}
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <ApperIcon name="Bed" size={20} className="text-primary" />
            <div>
              <p className="text-xs text-gray-500">Beds</p>
              <p className="font-semibold">{property.bedrooms}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <ApperIcon name="Bath" size={20} className="text-primary" />
            <div>
              <p className="text-xs text-gray-500">Baths</p>
              <p className="font-semibold">{property.bathrooms}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <ApperIcon name="Maximize" size={20} className="text-primary" />
            <div>
              <p className="text-xs text-gray-500">Sqft</p>
              <p className="font-semibold">{property.sqft.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;