import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const Header = ({ favoritesCount = 0, comparisonCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Browse", path: "/", icon: "Home" },
    { label: "Favorites", path: "/favorites", icon: "Heart", badge: favoritesCount },
    { label: "Compare", path: "/compare", icon: "GitCompare", badge: comparisonCount }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-primary to-primary-light p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
              <ApperIcon name="Home" size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Estate Browse
              </h1>
              <p className="text-xs text-gray-600">Find Your Dream Home</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button variant="ghost" className="relative">
                  <ApperIcon name={item.icon} size={20} />
                  {item.label}
                  {item.badge > 0 && (
                    <Badge variant="accent" className="absolute -top-1 -right-1 px-2 py-0.5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden border-t border-gray-200 bg-white"
        >
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ApperIcon name={item.icon} size={20} className="text-primary" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <Badge variant="accent">{item.badge}</Badge>
                )}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;