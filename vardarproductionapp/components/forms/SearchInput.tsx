"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi'; // Import search icon from react-icons
import classNames from 'classnames'; // Optional: for conditional styling

interface SearchInputProps {
  data: string[];
}

const SearchInput: React.FC<SearchInputProps> = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (filteredResults.length > 0) {
        if (event.key === 'ArrowDown') {
          setHighlightedIndex(prevIndex =>
            prevIndex === null ? 0 : Math.min(prevIndex + 1, filteredResults.length - 1)
          );
        } else if (event.key === 'ArrowUp') {
          setHighlightedIndex(prevIndex =>
            prevIndex === null ? filteredResults.length - 1 : Math.max(prevIndex - 1, 0)
          );
        } else if (event.key === 'Enter') {
          if (highlightedIndex !== null) {
            setSearchQuery(filteredResults[highlightedIndex]);
            setFilteredResults([]);
            setHighlightedIndex(null);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredResults, highlightedIndex]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery) {
        const results = data.filter(item =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredResults(results);
      } else {
        setFilteredResults([]);
      }
    }, 300); // Adjust the debounce delay as needed

    return () => clearTimeout(debounce);
  }, [searchQuery, data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClick = (item: string) => {
    setSearchQuery(item);
    setFilteredResults([]);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        className="border border-gray-400 rounded-full p-2 pl-10 w-full"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search..."
        aria-label="Search"
      />
      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600" />
      {filteredResults.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg mt-1 z-10">
          {filteredResults.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item)}
              className={classNames("p-2 cursor-pointer", {
                'bg-gray-200': highlightedIndex === index,
              })}
            >
              {item}
            </div>
          ))}
          {filteredResults.length === 0 && searchQuery && (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
