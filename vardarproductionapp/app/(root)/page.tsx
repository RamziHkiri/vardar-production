/* eslint-disable react/no-unescaped-entities */
import { authOptions } from '@/lib/AuthOptions';
import { getServerSession } from 'next-auth';
import React from 'react';
import Container from '@/components/Container';
import Title from '@/components/Title';
import StaticCard from '@/components/dashboard/charts/StaticCard';
import { LuTarget } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import CampagneStatus from '@/components/dashboard/charts/CampagneStatus';
import CampagnesDetails from '@/components/dashboard/charts/CampagnesDetails';
import dynamic from 'next/dynamic';
import CampagnesList from '../campagnes/components/CampagnesList';
import MeilleurCampagnes from '@/components/dashboard/charts/MeilleurCampagnes';
const HorizontalBar = dynamic(() => import('@/components/dashboard/charts/HorizontalBar'), {
    ssr: false,
});
const RoundChart = dynamic(() => import('@/components/dashboard/charts/RoundChart'), {
    ssr: false,
});

export default async function HomePage() {

    const session = await getServerSession(authOptions);

    return (
        <Container>
            <div className='flex flex-row justify-between'>
                <Title title='Dashboard' />
                <div className='bg-purple-500 text-white text-center pb-1 px-4  rounded-md text-sm '> <span className=' text-2xl'>+</span> Ajouter un fichier prospects</div>
            </div>
            <div className='flex flex-row gap-5 w-full'>

                <div className='w-3/4 border-neutral-500 flex flex-col gap-3  '>
                    <div className='bg-slate-100 rounded-xl  p-3 h-96'>
                        <HorizontalBar />
                    </div>
                    <div className='flex flex-row w-full gap-5 mt-3'>
                        <StaticCard title='Nbr Des Prospects' total={3400}  >
                            <LuTarget className='rounded-xl p-2 stroke-red-800 bg-red-200' size={60} />
                        </StaticCard>
                        <StaticCard title='Total Clients' total={3400}  >
                            <FaUsers className='rounded-xl p-2 bg-blue-100' color='blue' size={60} />
                        </StaticCard>
                        <StaticCard title='Total Des Revenues' total={3400}  >
                            <FaChartBar className='rounded-xl p-2 bg-green-200' color='green' size={60} />
                        </StaticCard>

                    </div>
                </div>
                <div className=' flex flex-col w-1/4 gap-5 '>
                    <div className='order-neutral-500/50 bg-slate-100 rounded-xl border h-1/3 p-3'>
                        <CampagneStatus />
                    </div>
                    <div className='order-neutral-500/50 bg-slate-100 rounded border h-2/3'>
                        <CampagnesDetails />
                    </div>
                </div>
            </div>
            <div className=' flex flex-row gap-5 w-full'>
                <div className='p-3 order-neutral-500/50 bg-slate-100 rounded border h-60 w-1/2'>
                    <h3 className='text-lg font-semibold'> List des meilleurs campagnes par total revenue:</h3>
                    <MeilleurCampagnes />
                </div>
                <div className='order-neutral-500/50 bg-slate-100 rounded border h-60 w-1/2'>
                    <RoundChart />
                </div>
            </div>
            <div className='bg-slate-100 flex flex-row gap-5 w-'>
                <CampagnesList />
            </div>

        </Container>
    )
}
