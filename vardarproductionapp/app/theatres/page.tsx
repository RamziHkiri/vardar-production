"use client"
import Container from '@/components/Container'
import Title from '@/components/Title'
import React, { useState } from 'react'
import CreateCampagnePopup from '@/components/createCampagnePopup/CreateCampagnePopup';
import ListTheatre from './components/ListTheatre';
import Link from 'next/link';


export default function Theatre() {
    const [showPopup, setShowPopup] = useState(false);

    const handlePopupOpen = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };
    return (
        <Container>
            <Title title='Théâtre' />
            <div className=' bg-white h-max'>
                <div className='flex flex-row justify-between items-center m-4 pb-1 '>
                    <div>filtre</div>
                    <div>trier par</div>
                    <div
                        className=' bg-pink-400 text-white text-center w-56 rounded-md text-sm cursor-pointer'

                    >
                        <Link className='flex flex-row justify-center items-center gap-2' href={"/theatres/create"}>
                            <span className='text-2xl'>+</span>
                            <p>Ajouter Théâtre</p>
                        </Link>

                    </div>

                    {showPopup && (
                        <CreateCampagnePopup onClose={handlePopupClose} /> // Render the Popup component when showPopup is true
                    )}
                </div>
                <div>
                    <ListTheatre />
                </div>
            </div>

        </Container>
    )
}
