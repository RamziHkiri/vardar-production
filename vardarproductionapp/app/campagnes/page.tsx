import CampagnesList from '@/app/campagnes/components/CampagnesList'
import Container from '@/components/Container'
import Title from '@/components/Title'
import React from 'react'

export default function Campagnes() {
    return (
        <Container>
            <Title title='Campagnes' />
            <div className=' bg-white h-screen'>
            <div className='flex flex-row justify-between items-center m-4 pb-1 '>
                <div>filtre</div>
                <div>trier par</div>
                <div className=' bg-purple-500 text-white  text-center  w-56 rounded-md text-sm '>
                    <span className=' text-2xl'>+</span> Créer Campagnes
                </div>
            </div>
            <div>
                <CampagnesList />
            </div>
            </div>
            
        </Container>
    )
}
