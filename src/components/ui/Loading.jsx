import { motion } from "framer-motion";

const Loading = ({ type = "grid" }) => {
  if (type === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl shadow-card overflow-hidden"
          >
            <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3 animate-pulse" />
              <div className="flex gap-4">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded flex-1 animate-pulse" />
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded flex-1 animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "detail") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 animate-pulse" />
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 animate-pulse" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-primary-light border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loading;