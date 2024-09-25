"use client"
import Input from '@/components/forms/Input';
import React, { useState, useEffect } from 'react';
import MultiSelect from '@/components/forms/MultiSelect';
import TextArea from '@/components/forms/TextArea';
import Button from '@/components/forms/Button';
import RetourButton from '@/components/forms/RetourButton';

interface Lieux {
    country: string
    region: string
}
export default function AddTheatre() {

    const [nom, setNom] = useState("");
    const [pays, setPays] = useState("");
    const [ville, setVille] = useState("");
    const [lieux, setLieux] = useState<Lieux>({ country: "", region: "" });

    const [capacite, setCapacite] = useState<number | undefined>(0);
    const [options, setOptions] = useState([]);




    useEffect(() => {
        const fetchLieux = async () => {
            setLieux({ country: pays, region: ville })
        };

        fetchLieux();
    }, [pays, ville]);

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/theatres', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom,
                    lieux: lieux,
                    capacite,
                }),
            });
            setNom('')
            setPays('')
            setVille('')
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
                    <Input
                        label='Pays'
                        value={pays}
                        onChange={(e) => setPays(e.target.value)}
                        placeholder='Tapez pays '
                    />
                    <Input
                        label='Ville'
                        value={ville}
                        onChange={(e) => setVille(e.target.value)}
                        placeholder='Tapez la ville'
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
