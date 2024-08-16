import Input from '@/components/forms/Input'
import React, { useState } from 'react'
import MultiSelect from '../../../../components/forms/MultiSelect';

export default function GeneralInfo() {
    const [nom, setNom] = useState("");
    const [pays, setPays] = useState("");
    const [region, setRegion] = useState("");
    const [prix, setPrix] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    return (
        <div className='p-5 w-max bg-white ' >
            <h3 className='font-semibold p-5'>General Info</h3>
            <div className='flex flex-row justify-around gap-6'>
                <div className='flex flex-col justify-be gap-6 items-center px-6'>
                    <Input label='Nom campagne' value={nom} onChange={(e) => setNom(e.target.value)} placeholder='tapez le nom de votre campagne' />
                    <MultiSelect options={options}
                        value={pays}
                        onChange={(e) => setPays(e.target.value)}
                        placeholder="Selectionner le pays"
                    />
                    <MultiSelect options={options}
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        placeholder="Selectionner la region"
                    />
                    <Input type='number' label='Prix ' value={prix} onChange={(e) => setPrix(e.target.value)} placeholder='Prix du billet' />
                    <Input label='Date Début' type='date' onChange={(e) => setStartDate(new Date(e.target.value))} placeholder='tapez le nom de votre campagne' />
                    <Input label='Date Début' type='date' onChange={(e) => setEndDate(new Date(e.target.value))} placeholder='tapez le nom de votre campagne' />
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}
6