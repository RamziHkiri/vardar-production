"use client"
import React from 'react'
import MeilleurCampagneItem from './MeilleurCampagneItem'

export default function MeilleurCampagnes() {
    return (
        <div className='flex flex-col justify-center  gap-3 p-4'>
            <MeilleurCampagneItem name='La belle & la blonde' range={1} ville={'Bruxelle'} total={10500.00} units={'€'} />
            <MeilleurCampagneItem name='La belle & la blonde' range={2} ville={'Nice'} total={9500.00} units={'€'} />
            <MeilleurCampagneItem name='La belle & la blonde' range={3} ville={'Marseille'} total={8000} units={'€'} />
            <div className='bg-blue-400 rounded-md text-center text-white cursor-pointer '>
                Afficher Autres ...
            </div>
        </div>
    )
}
