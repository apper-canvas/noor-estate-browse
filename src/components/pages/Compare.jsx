import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import propertyService from "@/services/api/propertyService";
import comparisonService from "@/services/api/comparisonService";

const Compare = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [comparison, setComparison] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadComparison();
  }, []);

  const loadComparison = async () => {
    try {
      setLoading(true);
      setError(null);
      const comparisonIds = await comparisonService.getAll();
      setComparison(comparisonIds);

      if (comparisonIds.length > 0) {
        const allProperties = await propertyService.getAll();
        const comparisonProperties = allProperties.filter(p => 
          comparisonIds.includes(p.Id)
        );
        setProperties(comparisonProperties);
      } else {
        setProperties([]);
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load comparison");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (propertyId) => {
    try {
      await comparisonService.remove(propertyId);
      await loadComparison();
      toast.success("Removed from comparison");
    } catch (err) {
      toast.error("Failed to remove property");
    }
  };

  const handleClearAll = async () => {
    try {
      await comparisonService.clear();
      await loadComparison();
      toast.success("Comparison cleared");
    } catch (err) {
      toast.error("Failed to clear comparison");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(price);
  };

  const comparisonRows = [
    { label: "Price", key: "price", format: (val) => formatPrice(val) },
    { label: "Property Type", key: "propertyType" },
    { label: "Location", key: "location", format: (val) => `${val.city}, ${val.state}` },
    { label: "Bedrooms", key: "bedrooms" },
    { label: "Bathrooms", key: "bathrooms" },
    { label: "Square Feet", key: "sqft", format: (val) => val.toLocaleString() },
    { label: "Year Built", key: "yearBuilt" },
    { label: "Lot Size", key: "lotSize", format: (val) => val > 0 ? `${val} acres` : "N/A" }
  ];

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadComparison} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-primary-light p-3 rounded-xl shadow-lg">
              <ApperIcon name="GitCompare" size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold text-gray-900">
                Compare Properties
              </h1>
              <p className="text-gray-600">
                {properties.length} {properties.length === 1 ? "property" : "properties"} selected
              </p>
            </div>
          </div>
          
          {properties.length > 0 && (
            <Button variant="secondary" onClick={handleClearAll}>
              <ApperIcon name="X" size={20} />
              Clear All
            </Button>
          )}
        </div>
      </motion.div>

      {properties.length === 0 ? (
        <Empty
          title="No Properties to Compare"
          message="Add properties to comparison by clicking the compare icon on property cards."
          action={() => navigate("/")}
          actionLabel="Browse Properties"
        />
      ) : (
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-primary/5 to-primary-light/5 border-b-2 border-primary/10">
                  <th className="text-left p-6 font-display font-semibold text-gray-900 sticky left-0 bg-gradient-to-r from-primary/5 to-primary-light/5 z-10">
                    Specification
                  </th>
                  {properties.map((property) => (
                    <th key={property.Id} className="p-6 min-w-[300px]">
                      <div className="space-y-4">
                        <div className="relative h-48 rounded-xl overflow-hidden group">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <button
                            onClick={() => handleRemove(property.Id)}
                            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                          >
                            <ApperIcon name="X" size={16} className="text-gray-700" />
                          </button>
                        </div>
                        <div className="text-left">
                          <h3 className="font-display font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
                            {property.title}
                          </h3>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => navigate(`/property/${property.Id}`)}
                            className="w-full"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row.key}
                    className={index % 2 === 0 ? "bg-gray-50/50" : "bg-white"}
                  >
                    <td className="p-6 font-medium text-gray-700 sticky left-0 bg-inherit z-10 border-r border-gray-200">
                      {row.label}
                    </td>
                    {properties.map((property) => {
                      const value = property[row.key];
                      const displayValue = row.format ? row.format(value) : value;
                      return (
                        <td key={property.Id} className="p-6 text-gray-900">
                          {displayValue}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compare;