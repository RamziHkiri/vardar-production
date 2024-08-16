import Input from '@/components/forms/Input'
import React, { useState } from 'react'
import MultiSelect from '../../../../components/forms/MultiSelect';
import RadioSelect from './RadioSelect';
import Theatre from '@/app/theatres/page';

export default function SpectacleInfo() {
    const [nom, setNom] = useState("");
    const [pays, setPays] = useState("");
    const [region, setRegion] = useState("");
    const [prix, setPrix] = useState("");
    const [theatre, setTheatre] = useState("");
    const [endDate, setEndDate] = useState(new Date());

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    return (
        <div className='p-5 w-max bg-white ' >
            <h2 className='font-semibold p-5'>Selectionner Spectacle</h2>
            <div className='flex flex-row justify-around gap-6'>
                <div className='flex flex-col justify-be gap-6 items-start px-6'>
                    <MultiSelect options={options}
                        value={theatre}
                        onChange={(e) => setPays(e.target.value)}
                        placeholder="Liste des Spectacles"
                    />
                    <p className=' font-semibold text-md'>Selectionner Acteur</p>

                    <Input label='Nom Spectacle ' value={prix} onChange={(e) => setPrix(e.target.value)} placeholder='Nouveau Spectacle' />


                    <MultiSelect options={options}
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        placeholder="Selectionner la region"
                    />

                </div>
                <div>
                </div>
            </div>
        </div>
    )
}
6