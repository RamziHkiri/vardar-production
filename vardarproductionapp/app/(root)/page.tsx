import Navigation from '@/components/dashboard/Navigation';
import SearchInput from '@/components/dashboard/SearchInput';
import LogoutBtn from '@/components/LogoutBtn';
import { authOptions } from '@/lib/AuthOptions';
import { getServerSession } from 'next-auth';
import React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline'
import { motion, useAnimationControls } from 'framer-motion'

export default async function HomePage() {

    const session = await getServerSession(authOptions);

    return (
        <main className='bg-slate-200 w-full h-full flex flex-row '>
            <Navigation />
            <section className='flex flex-col p-10 ml-20 w-full gap-5 my-10'>
                <div className='flex flex-row justify-between'>
                    <h1 className=' text-3xl text-neutral-700 font-semibold'>Dashboard</h1>
                    <div className='bg-red-700 text-white text-center pb-1 px-4  rounded-md text-sm '> <span className=' text-2xl'>+</span> Ajouter un fichier prospects</div>
                </div>
                <div className='flex flex-row gap-5 w-full'                >

                    <div className='w-3/4 border-neutral-500/50  '>
                        <div className='bg-slate-100 rounded border h-80'>

                        </div>
                        <div className='flex flex-row w-full gap-5 mt-3'>
                            <div className='w-1/3 bg-slate-100 rounded border h-32'></div>
                            <div className='w-1/3 bg-slate-100 rounded border h-32'></div>
                            <div className='w-1/3 bg-slate-100 rounded border h-32'></div>
                        </div>
                    </div>
                    <div className=' flex flex-col w-1/4 gap-5 '>
                        <div className='order-neutral-500/50 bg-slate-100 rounded border h-1/3'></div>
                        <div className='order-neutral-500/50 bg-slate-100 rounded border h-2/3'></div>
                    </div>
                </div>
                <div className=' flex flex-row gap-5 w-full'>
                    <div className='order-neutral-500/50 bg-slate-100 rounded border h-60 w-1/2'></div>
                    <div className='order-neutral-500/50 bg-slate-100 rounded border h-60 w-1/2'></div>
                </div>
            </section>

        </main >

    )
}
