import Container from '@/components/Container'
import Title from '@/components/Title'
import React from 'react'
import Link from 'next/link'
import ListActeurs from './components/ListActeurs'

export default function Acteurs() {
    return (
        <Container>
            <Title title='Spectacles' />
            <div className=' bg-white h-max'>
                <div className='flex flex-row justify-between items-center m-4 pb-1 '>
                    <div>filtre</div>
                    <div>trier par</div>
                    <div
                        className='flex flex-row justify-center items-center gap-2 bg-pink-400 text-white text-center w-56 rounded-md text-sm cursor-pointer'
                    >
                        <Link className='flex flex-row justify-center items-center gap-2' href={"/acteurs/create"}>
                            <span className='text-2xl'>+</span>
                            <p>Ajouter Acteur</p>
                        </Link>
                    </div>

                </div>
                <div>
                    <ListActeurs />
                </div>
            </div>

        </Container>
    )

}
