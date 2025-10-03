import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] px-4"
    >
      <div className="bg-gradient-to-br from-error/10 to-error/5 rounded-full p-6 mb-6">
        <ApperIcon name="AlertCircle" size={64} className="text-error" />
      </div>
      <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
        Oops! Something Went Wrong
      </h3>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <ApperIcon name="RotateCw" size={20} />
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default Error;