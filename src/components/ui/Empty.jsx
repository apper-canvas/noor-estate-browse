import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No Properties Found",
  message = "Try adjusting your filters or search criteria to find more properties.",
  action,
  actionLabel = "Clear Filters"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] px-4"
    >
      <div className="bg-gradient-to-br from-primary-light/10 to-primary/5 rounded-full p-8 mb-6">
        <ApperIcon name="Home" size={80} className="text-primary-light" />
      </div>
      <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {message}
      </p>
      {action && (
        <Button onClick={action} variant="primary">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;