"use client"
import React, { useState } from 'react';

type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  options: Option[];
  onChange: (selected: string[]) => void;
};

const MultiSelect: React.FC<MultiSelectProps> = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
    onChange(selectedValues);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative  inline-block">
      <button
        onClick={toggleDropdown}
        className="flex flex-row justify-between border text-neutral-900 font-semibold p-2 w-60 rounded-xl border-pink-400 bg-neutral-300"
      >
        {selectedOptions.length > 0
          ? selectedOptions.join(', ')
          : 'Date Plus Proche'}
        <span className="ml-2">&#9662;</span>
      </button>

      {isOpen && (
        <div className="absolute mt-1 border rounded w-full bg-white shadow-lg">
          <select
            multiple
            value={selectedOptions}
            onChange={handleSelectChange}
            className="block p-2 w-full border-none"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

const MultipleSelect: React.FC = () => {
  const options: Option[] = [
    { value: 'Date plus proche', label: 'Date plus proche' },
    { value: 'Autres Filtres', label: 'Autres Filtres' },
    
  ];

  const handleSelectionChange = (selected: string[]) => {
    console.log('Selected options:', selected);
  };

  return (
    <div>
      <MultiSelect options={options} onChange={handleSelectionChange} />
    </div>
  );
};

export default MultipleSelect;
