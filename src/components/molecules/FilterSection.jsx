import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const FilterSection = ({ title, icon, isOpen, onToggle, children }) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2 hover:text-primary transition-colors"
      >
        <div className="flex items-center gap-2">
          <ApperIcon name={icon} size={20} className="text-primary" />
          <span className="font-semibold text-gray-900">{title}</span>
        </div>
        <ApperIcon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={20}
          className="text-gray-500"
        />
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-4 space-y-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default FilterSection;