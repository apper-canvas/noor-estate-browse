import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const ImageGallery = ({ images, title }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="space-y-4">
        <div className="relative h-96 rounded-2xl overflow-hidden group">
          <motion.img
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={images[selectedIndex]}
            alt={`${title} - Image ${selectedIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ApperIcon name="Maximize2" size={20} className="text-gray-700" />
          </button>

          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ApperIcon name="ChevronLeft" size={24} className="text-gray-700" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ApperIcon name="ChevronRight" size={24} className="text-gray-700" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                index === selectedIndex
                  ? "border-primary shadow-lg scale-105"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors"
            >
              <ApperIcon name="X" size={24} className="text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors"
            >
              <ApperIcon name="ChevronLeft" size={32} className="text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors"
            >
              <ApperIcon name="ChevronRight" size={32} className="text-white" />
            </button>

            <motion.img
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={images[selectedIndex]}
              alt={`${title} - Image ${selectedIndex + 1}`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-lg font-medium">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;