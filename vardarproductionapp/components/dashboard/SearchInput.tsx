"use client";
import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'; // Import search icon from react-icons

interface SearchInputProps {
  data: string[];
}

const SearchInput: React.FC<SearchInputProps> = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<string[]>([]);

  useEffect(() => {
    if (searchQuery) {
      const results = data.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery, data]);

  return (
    <div className="relative ">
      <input
        type="text"
        className="border border-gray-400 rounded-full p-2 pl-10 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
      />
      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600" />
      <div className="bg-white rounded shadow-md max-h-60 overflow-y-auto ">
        {filteredResults.length > 0 ? (
          filteredResults.map((item, index) => (
            <div key={index} className="p-2 border-b border-gray-200 last:border-none">
              {item}
            </div>
          ))
        ) : (
          searchQuery && <div className="p-2 text-gray-500">No results found</div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
