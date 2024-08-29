"use client"
import React, { useEffect, useState } from 'react';
import { Campagne } from '@/types'; // Assurez-vous d'avoir un type défini pour Campagne



const Agenda: React.FC = () => {
    const [campagnes, setCampagnes] = useState<Campagne[]>([]);

    useEffect(() => {
        const fetchCampagnes = async () => {
          const response = await fetch('/api/campagnes'); // L'API doit être créée pour renvoyer les campagnes
          const data = await response.json();
          setCampagnes(data.campagnes);
        };
    
        fetchCampagnes();
      }, []);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Agenda des Campagnes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 b">
        {campagnes.map((campagne) => (
          <div key={campagne.id} className="border p-4 rounded shadow bg-white">
            <h3 className="text-lg font-bold">{campagne.nom}</h3>
            <p className="text-sm">
              Début: {campagne.dateDebut ? new Date(campagne.dateDebut).toLocaleDateString() : 'Non défini'}
            </p>
            <p className="text-sm">
              Fin: {campagne.dateFin ? new Date(campagne.dateFin).toLocaleDateString() : 'Non défini'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agenda;
