
import MultipleSelect from '@/components/dashboard/MultipleSelect'
import React from 'react'

export default function CampagnesDetails() {
    return (
        <>
        <div className='flex flex-col p-3 gap-3'>
            <div className='flex flex-row justify-between items-center'>
                <p className='text-2xl font-bold text-orange-600 '>Campagnes En Cours</p>
                <p className='rounded-xl bg-orange-600 font-semibold text-white text-3xl py-2 px-4'>9</p>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <p className=' text-md '>Trier par: </p>
                <MultipleSelect />
            </div>
        </div>
        </>
        
    )
}
