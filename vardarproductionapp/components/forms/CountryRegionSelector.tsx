"use client"
import React, { useState, ChangeEvent } from 'react';

type CountryData = {
  [key: string]: string[];
};

const CountryRegionSelector: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [regions, setRegions] = useState<string[]>([]);

  const data: CountryData = {
    France: ["Île-de-France", "Provence-Alpes-Côte d'Azur", "Nouvelle-Aquitaine", "lille", "bordeaux"],
    Canada: ["Québec", "Ontario", "Alberta"],
  };

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setRegions(data[country] || []);
  };

  return (
    <div>
      <select onChange={handleCountryChange}>
        <option value="">Sélectionner un pays</option>
        {Object.keys(data).map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select disabled={!selectedCountry}>
        <option value="">Sélectionner une région</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryRegionSelector;
