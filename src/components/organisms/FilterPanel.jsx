import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import FilterSection from "@/components/molecules/FilterSection";

const FilterPanel = ({ filters, onFiltersChange, onClose }) => {
  const [openSections, setOpenSections] = useState({
    price: true,
    property: true,
    rooms: true,
    size: false
  });

  const propertyTypes = ["House", "Condo", "Townhouse"];

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePriceChange = (field, value) => {
    onFiltersChange({
      ...filters,
      priceRange: { ...filters.priceRange, [field]: parseInt(value) || 0 }
    });
  };

  const handlePropertyTypeToggle = (type) => {
    const types = filters.propertyTypes || [];
    const updated = types.includes(type)
      ? types.filter(t => t !== type)
      : [...types, type];
    onFiltersChange({ ...filters, propertyTypes: updated });
  };

  const handleSqftChange = (field, value) => {
    onFiltersChange({
      ...filters,
      sqftRange: { ...filters.sqftRange, [field]: parseInt(value) || 0 }
    });
  };

  const handleClearAll = () => {
    onFiltersChange({
      priceRange: { min: 0, max: 5000000 },
      location: "",
      propertyTypes: [],
      bedrooms: 0,
      bathrooms: 0,
      sqftRange: { min: 0, max: 10000 }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-gray-900 flex items-center gap-2">
          <ApperIcon name="SlidersHorizontal" size={24} className="text-primary" />
          Filters
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="X" size={20} />
          </button>
        )}
      </div>

      <FilterSection
        title="Price Range"
        icon="DollarSign"
        isOpen={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Price
            </label>
            <Input
              type="number"
              value={filters.priceRange?.min || 0}
              onChange={(e) => handlePriceChange("min", e.target.value)}
              placeholder="$0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Price
            </label>
            <Input
              type="number"
              value={filters.priceRange?.max || 5000000}
              onChange={(e) => handlePriceChange("max", e.target.value)}
              placeholder="$5,000,000"
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection
        title="Property Type"
        icon="Building"
        isOpen={openSections.property}
        onToggle={() => toggleSection("property")}
      >
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label key={type} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={filters.propertyTypes?.includes(type) || false}
                onChange={() => handlePropertyTypeToggle(type)}
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Bedrooms & Bathrooms"
        icon="Bed"
        isOpen={openSections.rooms}
        onToggle={() => toggleSection("rooms")}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Bedrooms
            </label>
            <Input
              type="number"
              min="0"
              value={filters.bedrooms || 0}
              onChange={(e) => onFiltersChange({ ...filters, bedrooms: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Bathrooms
            </label>
            <Input
              type="number"
              min="0"
              value={filters.bathrooms || 0}
              onChange={(e) => onFiltersChange({ ...filters, bathrooms: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection
        title="Square Footage"
        icon="Maximize"
        isOpen={openSections.size}
        onToggle={() => toggleSection("size")}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Sqft
            </label>
            <Input
              type="number"
              value={filters.sqftRange?.min || 0}
              onChange={(e) => handleSqftChange("min", e.target.value)}
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Sqft
            </label>
            <Input
              type="number"
              value={filters.sqftRange?.max || 10000}
              onChange={(e) => handleSqftChange("max", e.target.value)}
              placeholder="10,000"
            />
          </div>
        </div>
      </FilterSection>

      <Button onClick={handleClearAll} variant="secondary" className="w-full">
        <ApperIcon name="X" size={20} />
        Clear All Filters
      </Button>
    </div>
  );
};

export default FilterPanel;