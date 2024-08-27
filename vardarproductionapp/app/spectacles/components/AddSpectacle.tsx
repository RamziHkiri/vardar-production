import Input from '@/components/forms/Input';
import React, { useState, useEffect } from 'react';
import MultiSelect from '@/components/forms/MultiSelect';
import TextArea from '@/components/forms/TextArea';
import Button from '@/components/forms/Button';
import RetourButton from '@/components/forms/RetourButton';

export default function AddSpectacle() {
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [acteur, setActeur] = useState("");
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchActeurs = async () => {
            try {
                const response = await fetch('/api/acteurs');
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
            const response = await fetch('/api/spectacles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titre,
                    description,
                    acteurId: acteur,
                }),
            });
            setActeur('')
            setTitre('')
            setDescription('')

            const result = await response.json();
            if (result) {
                console.log('Spectacle added:', result);
            } else {
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error('Error saving spectacle:', error);
        }
    };
    console.log(acteur)

    return (
        <div className='p-5 w-max bg-white'>
            <div className='flex flex-row justify-between items-center'>
                <h2 className="text-2xl font-bold mb-4">Créé nouveau spectacle:</h2>
                <RetourButton link='/spectacles' label='Retour' />
            </div>
            <div className='flex flex-row justify-around gap-6'>
                <div className='flex flex-col gap-6 items-center px-6'>
                    <Input
                        label='Titre du Spectacle'
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                        placeholder='Tapez le nom de votre spectacle'
                    />

                    <MultiSelect
                        options={options}
                        value={acteur}
                        onChange={(e) => setActeur(e.target.value)}
                        placeholder="Sélectionnez des acteurs"
                    />

                    <TextArea
                        label='Description'
                        description={description}
                        setDescription={setDescription}
                        placeholder='Tapez la description du spectacle'
                    />

                    <Button
                        label='Ajouter un Spectacle'
                        onClick={handleSubmit}
                    />
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}
