import React from 'react'

export default function CampagneStatus() {
    return (
        <>

            <div className='flex flex-col gap-2 text-sm'>
                <div className='flex flex-row justify-between text-blue-600'>
                    <p>Injection cible</p>
                    <p>3</p>
                </div>
                <div className='flex flex-row justify-between text-blue-600'>
                    <p>Qualification cible</p>
                    <p>3</p>
                </div>
                <div className='flex flex-row justify-between text-blue-600'>
                    <p>Génération fichier audio</p>
                    <p>3</p>
                </div>
                <div className='flex flex-row justify-between text-blue-600'>
                    <p>Envoie des Vocaux</p>
                    <p>3</p>
                </div>
                <div className='flex flex-row justify-between text-green-500'>
                    <p>Terminée</p>
                    <p>3</p>
                </div>
            </div>
            <hr />
            <div className='flex flex-row justify-between font-bold text-green-700 text-opacity-60'>
                <p>Total Campagnes</p>
                <p className='text-xl font-bold'>3</p>
            </div>

        </>
    )

}
