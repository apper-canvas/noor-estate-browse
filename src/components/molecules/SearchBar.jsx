import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const SearchBar = ({ onSearch, placeholder = "Search by city, state, or address..." }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <ApperIcon 
          name="Search" 
          size={20} 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-12"
        />
      </div>
      <Button type="submit" variant="primary">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;