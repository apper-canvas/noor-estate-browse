# Estate Browse - Real Estate Marketplace

A sophisticated real estate listing platform that enables users to efficiently browse, filter, and evaluate properties through visual exploration and detailed comparison tools.

## Features

- **Property Browsing**: Grid and list view with comprehensive filtering and sorting
- **Advanced Filters**: Filter by price, location, property type, bedrooms, bathrooms, and square footage
- **Property Details**: Full property information with image gallery, specifications, and agent details
- **Favorites System**: Save and manage favorite properties with persistent storage
- **Property Comparison**: Compare up to 3 properties side-by-side with aligned specifications
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Instant filtering and calculation updates as you interact

## Technology Stack

- React 18 with Vite for blazing-fast development
- Tailwind CSS for premium, responsive styling
- React Router for seamless navigation
- Framer Motion for sophisticated animations
- Lucide React for beautiful icons
- React Toastify for elegant notifications
- Date-fns for date formatting

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic components (Button, Input, Badge)
│   ├── molecules/      # Composed components (SearchBar, PropertyCard)
│   ├── organisms/      # Complex components (Header, FilterPanel, ImageGallery)
│   ├── pages/          # Page components (Browse, PropertyDetail, Favorites, Compare)
│   ├── ui/             # State components (Loading, Error, Empty)
│   └── ApperIcon.jsx   # Icon wrapper component
├── services/
│   ├── api/            # Service implementations
│   └── mockData/       # JSON data files
├── utils/              # Utility functions
├── App.jsx            # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## Key Features

### Property Browsing
- Grid and list view options for property display
- Advanced filtering by price, location, property type, rooms, and size
- Multiple sorting options (newest, price, size)
- Real-time search and filter updates

### Property Details
- Full-screen image gallery with thumbnail navigation
- Comprehensive property specifications
- Agent contact information
- Similar properties recommendations

### Favorites & Comparison
- Persistent favorites storage using localStorage
- Compare up to 3 properties side-by-side
- Visual highlighting of property differences
- Easy management of saved properties

## Design Philosophy

The application prioritizes visual exploration and efficient filtering to help users find their ideal property quickly. The warm color palette balances professional credibility with the emotional nature of home-buying, while the clean, spacious layout ensures properties sell themselves through excellent imagery.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - All Rights Reserved