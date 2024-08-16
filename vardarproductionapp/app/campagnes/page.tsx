"use client"
import CampagnesList from '@/app/campagnes/components/CampagnesList'
import Container from '@/components/Container'
import Title from '@/components/Title'
import React, { useState } from 'react'
import CreateCampagnePopup from '@/components/createCampagnePopup/CreateCampagnePopup';

export default function Campagnes() {
    const [showPopup, setShowPopup] = useState(false);

    const handlePopupOpen = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };
    return ( 
        <Container>
            <Title title='Campagnes' />
            <div className=' bg-white h-max'>
                <div className='flex flex-row justify-between items-center m-4 pb-1 '>
                    <div>filtre</div>
                    <div>trier par</div>
                    <div
                        className='flex flex-row justify-center items-center gap-2 bg-pink-400 text-white text-center w-56 rounded-md text-sm cursor-pointer'
                        onClick={handlePopupOpen}
                    >
                        <span className='text-2xl'>+</span>
                        <p>Créer Campagnes</p>
                    </div>

                    {showPopup && (
                        <CreateCampagnePopup onClose={handlePopupClose} />
                    )}
                </div>
                <div>
                    <CampagnesList />
                </div>
            </div>

        </Container>
    )
}
