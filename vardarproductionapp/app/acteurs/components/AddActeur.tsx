"use client"
import Input from '@/components/forms/Input';
import React, { useState, useEffect } from 'react';
import TextArea from '@/components/forms/TextArea';
import Button from '@/components/forms/Button';
import RetourButton from '@/components/forms/RetourButton';

export default function AddActeur() {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [bio, setBio] = useState("");
    const [nationalite, setNationalte] = useState("");
    const [dateNaissance, setDateNaissance] = useState("");


    const handleSubmit = async () => {
        try {
            const dateOfBirth = new Date(dateNaissance);
    
            const response = await fetch('/api/acteurs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom,
                    prenom,
                    dateNaissance: dateOfBirth,  // Use the Date object
                    nationalite,
                    bio,
                }),
            });
    
            const result = await response.json();
            if (result) {
                console.log('Acteur added:', result);
            } else {
                console.error('Error : values errors 1 1 1');
            }
        } catch (error) {
            console.error('Error saving spectacle:', error);
        }
    };
    


    return (
        <div className='p-5 w-max bg-white'>
            <div className='flex flex-row justify-between items-center'>
                <h2 className="text-2xl font-bold mb-4">Ajouter nouveau Acteur :</h2>
                <RetourButton link='/spectacles' label='Retour' />
            </div>
            <h3 className='font-semibold p-5'>Remplir les shamps suivants</h3>
            <div className='flex flex-row justify-around gap-6'>
                <div className='flex flex-col gap-6 items-center px-6'>
                    <Input
                        label='Nom Acteur'
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Tapez le nom de l'acteur"
                    />
                    <Input
                        label='Prénom Acteur'
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        placeholder="Tapez le Prénom de l'acteur"
                    />

                    <Input
                        label='Nationnalité'
                        value={nationalite}
                        onChange={(e) => setNationalte(e.target.value)}
                        placeholder="Tapez la Nationalité de l'acteur"
                    />
                    <Input
                        type='date'
                        label='Capacité'
                        value={dateNaissance}
                        onChange={(e) => setDateNaissance(e.target.value)}
                    />
                    <TextArea
                        label='Bio '
                        description={bio}
                        setDescription={setBio}
                        placeholder="Déscription de l'acteur"
                    />


                    <Button
                        label='Ajouter un Acteur'
                        onClick={handleSubmit}
                    />
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}
