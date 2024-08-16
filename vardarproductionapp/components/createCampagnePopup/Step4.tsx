import React, { useState } from 'react';

interface Step4Props {
  formData: {
    nom: string;
    theatreId: string[];
    lieux: { country: string; region: string };
    prix: number;
    dateDebut?: Date;
    dateFin?: Date;
  };
  updateFormData: (data: Partial<Step4Props['formData']>) => void;
}

const Step4: React.FC<Step4Props> = ({ formData, updateFormData }) => {
  const [theatres, setTheatres] = useState<string[]>([]);

  const countries = ['France', 'USA', 'Canada'] as const; // Example countries
  const regions = {
    France: ['Île-de-France', 'Provence-Alpes-Côte d\'Azur'],
    USA: ['California', 'New York'],
    Canada: ['Ontario', 'Quebec'],
  } as const;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleTheatreSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheatres = Array.from(e.target.selectedOptions, option => option.value);
    updateFormData({ theatreId: selectedTheatres });
    setTheatres(selectedTheatres);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ lieux: { ...formData.lieux, country: e.target.value, region: '' } });
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ lieux: { ...formData.lieux, region: e.target.value } });
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="nom" className="block text-gray-700 font-bold mb-2">Nom Campagne</label>
        <input
          type="text"
          name="nom"
          id="nom"
          value={formData.nom}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="theatreId" className="block text-gray-700 font-bold mb-2">Theatre</label>
        <select
          name="theatreId"
          id="theatreId"
          multiple
          value={theatres}
          onChange={handleTheatreSelect}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="theatre1">Theatre 1</option>
          <option value="theatre2">Theatre 2</option>
          <option value="theatre3">Theatre 3</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="country" className="block text-gray-700 font-bold mb-2">Country</label>
        <select
          name="country"
          id="country"
          value={formData.lieux.country}
          onChange={handleCountryChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a country</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {formData.lieux.country && (
        <div className="mb-4">
          <label htmlFor="region" className="block text-gray-700 font-bold mb-2">Region</label>
          <select
            name="region"
            id="region"
            value={formData.lieux.region}
            onChange={handleRegionChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a region</option>
            {(regions[formData.lieux.country as keyof typeof regions] || []).map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="prix" className="block text-gray-700 font-bold mb-2">Prix</label>
        <input
          type="number"
          name="prix"
          id="prix"
          value={formData.prix}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="dateDebut" className="block text-gray-700 font-bold mb-2">Date Début</label>
        <input
          type="date"
          name="dateDebut"
          id="dateDebut"
          value={formData.dateDebut ? new Date(formData.dateDebut).toISOString().split('T')[0] : ''}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="dateFin" className="block text-gray-700 font-bold mb-2">Date Fin</label>
        <input
          type="date"
          name="dateFin"
          id="dateFin"
          value={formData.dateFin ? new Date(formData.dateFin).toISOString().split('T')[0] : ''}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
};

export default Step4;
