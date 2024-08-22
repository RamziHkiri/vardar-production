"use client"
import Input from '@/components/forms/Input';
import React, { useState, useEffect } from 'react';
import MultiSelect from '@/components/forms/MultiSelect';
import TextArea from '@/components/forms/TextArea';
import Button from '@/components/forms/Button';
import RetourButton from '@/components/forms/RetourButton';

export default function AddTheatre() {
    const [nom, setNom] = useState("");
    const [adresse, setAdresse] = useState("");
    const [capacite, setCapacite] = useState<number | undefined>(0);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchActeurs = async () => {
            try {
                const response = await fetch('/api/theatres');
                const acteurs = await response.json();
                console.log(acteurs);
                if (acteurs) {
                    const options = acteurs.map((acteur: any) => ({
                        value: acteur.id, // Store the ID as the value
                        label: `${acteur.nom} ${acteur.prenom}`, // Display nom + prenom
                    }));
                    setOptions(options);
                } else {
                    console.error('Error fetching acteurs:', acteurs);
                }
            } catch (error) {
                console.error('Error fetching acteurs:', error);
            }
        };

        fetchActeurs();
    }, []);

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/theatres', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom,
                    adresse,
                    capacite,
                }),
            });
            setNom('')
            setAdresse('')
            setCapacite(0)
            const result = await response.json();
            if (result) {
                console.log('Spectacle added:', result);
            } else {
                console.error('Error : values errors  1 1 1');
            }
        } catch (error) {
            console.error('Error saving spectacle:', error);
        }

    };


    return (
        <div className='p-5 w-max bg-white'>
            <div className='flex flex-row justify-between items-center'>
                <h2 className="text-2xl font-bold mb-4">Ajouter nouveau Théâtre :</h2>
                <RetourButton link='/spectacles' label='Retour' />
            </div>
            <h3 className='font-semibold p-5'>Remplir les shamps suivants</h3>
            <div className='flex flex-row justify-around gap-6'>
                <div className='flex flex-col gap-6 items-center px-6'>
                    <Input
                        label='Nom théâtre'
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder='Tapez le nom de votre théâtre'
                    />
                    <TextArea
                        label='Adresse '
                        description={adresse}
                        setDescription={setAdresse}
                        placeholder="Tapez l'adresse"
                    />
                    <Input
                        type='number'
                        label='Capacité'
                        value={capacite}
                        onChange={(e) => setCapacite(parseInt(e.target.value, 10))}
                        placeholder='0'
                    />

                    <Button
                        label='Ajouter un Théatre'
                        onClick={handleSubmit}
                    />
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}
