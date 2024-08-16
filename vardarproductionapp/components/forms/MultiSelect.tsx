import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, value, onChange, placeholder, disabled }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="outline-none p-2 border-2 w-full border-pink-50 rounded-md "
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default MultiSelect;
