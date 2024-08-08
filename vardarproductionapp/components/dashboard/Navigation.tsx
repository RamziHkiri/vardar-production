"use client"
import { motion, useAnimationControls } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import NavigationLink from './NavigationLink'
import { ChartBarIcon } from '@heroicons/react/24/outline'
import { ListBulletIcon } from '@heroicons/react/24/outline'
import { CalendarDateRangeIcon } from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react'
import SearchInput from '../forms/SearchInput'
import LogoutBtn from '../LogoutBtn'
import { IoNotificationsSharp } from "react-icons/io5";
import Avatar from './Avatar'
import LanguageSelector from './LanguageSelector';
import { IoSettingsOutline } from "react-icons/io5";
import { GiTheaterCurtains } from "react-icons/gi";


const containerVariants = {
    close: {
        width: "4rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5
        }
    },
    open: {
        width: "17rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5
        }
    }
}

const svgVariants = {
    close: {
        rotate: 360
    },
    open: {
        rotate: 180
    }
}

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const containerControls = useAnimationControls();
    const svgControls = useAnimationControls();

    useEffect(() => {
        containerControls.start(isOpen ? 'open' : 'close')
        svgControls.start(isOpen ? 'open' : 'close')
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <div className='flex p-2 flex-row bg-slate-100 w-full fixed shadow justify-between items-center  pr-10'>
                <div className='font-pacifico  flex space-x-2 items-center justify-center text-xl font-semibold text-center ml-8'>
                    <h1 className=' text-red-700 '>
                        Vardar
                    </h1>
                    <h1 className='text-blue-600'>
                        Production
                    </h1>

                </div>
                <SearchInput data={[]} />
                <div className='flex flex-row justify-between gap-8 items-center'>
                    <div className='ml-3 text-blue-600'>
                        <IoNotificationsSharp size={24} color='blue-500' />
                    </div>
                    <div className='ml-3 text-blue-600'>
                        <Avatar/>
                    </div>
                    <div className='ml-3'>
                    <LanguageSelector/>
                    </div>
                    <div className='ml-3'>
                        <LogoutBtn />
                    </div>
                </div>
            </div>
            <motion.nav
                variants={containerVariants}
                animate={containerControls}
                initial="close"
                className='bg-slate-100 fixed flex flex-col z-10 gap-10 py-5 px-4   top-14 left-0 h-full shadow-right-only'>

            

                    <button className='flex flex-row w-full justify-end place-items-end ' onClick={toggleMenu}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className='w-7 h-7 stroke-white  stroke-2 p-1 rounded-2xl bg-blue-600  '>
                            <motion.path
                                variants={svgVariants}
                                animate={svgControls}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut"
                                }}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                <div className='flex flex-col gap-3'>
                    <NavigationLink link='/' name='Dashboard' isOpen={isOpen}>
                        <ChartBarIcon className='stroke-inherit  min-w-6 w-6' />
                    </NavigationLink>
                    <NavigationLink link='/campagnes' name='Gestion Campagnes' isOpen={isOpen}>
                        <ListBulletIcon className='stroke-inherit  min-w-6 w-6' />
                    </NavigationLink>
                    <NavigationLink link='/spectacles' name='Gestion Spectacles' isOpen={isOpen}>
                        <GiTheaterCurtains size={32} className='stroke-inherit  min-w-6 w-6' />
                    </NavigationLink>
                    <NavigationLink link='/prospects' name='Gestion Prospects' isOpen={isOpen}>
                        <ListBulletIcon className='stroke-inherit min-w-6 w-6' />
                    </NavigationLink>
                    <NavigationLink link='/reporting'  name='Reporting Campagnes' isOpen={isOpen}>
                        <ListBulletIcon className='stroke-inherit min-w-6 w-6' />
                    </NavigationLink>
                    <NavigationLink link='#' name='Calendrier' isOpen={isOpen}>
                        <CalendarDateRangeIcon className='stroke-inherit min-w-6 w-6' />
                    </NavigationLink>
                </div>
                <div className='flex flex-col gap-3'>
                    <NavigationLink link='#' name='Paramétres' isOpen={isOpen}>
                        <IoSettingsOutline size={32} className='stroke-inherit stroke-[0.75] min-w-6 w-6' />
                    </NavigationLink>
                    <div onClick={() => signOut()}>
                        <NavigationLink link='#' name='Déconnecter' isOpen={isOpen}>
                            <ListBulletIcon className='stroke-inherit  min-w-6 w-6' />
                        </NavigationLink>
                    </div>

                </div>
            </motion.nav>
        </>

    )
}
