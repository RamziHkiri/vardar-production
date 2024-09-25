/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { motion, useAnimationControls } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import NavigationLink from './NavigationLink'
import { ChartBarIcon } from '@heroicons/react/24/outline'
import { ListBulletIcon } from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react'
import SearchInput from '../forms/SearchInput'
import LogoutBtn from '../LogoutBtn'
import { IoNotificationsSharp, IoCalendarNumberOutline } from "react-icons/io5";
import Avatar from './Avatar'
import LanguageSelector from './LanguageSelector';
import { IoSettingsOutline } from "react-icons/io5";
import { GiTheaterCurtains, GiSpectacles, GiClown } from "react-icons/gi";
import logo from "@/app/images/logo.png"
import Image from 'next/image'
import { GrPowerShutdown } from 'react-icons/gr'
import { TbMasksTheater } from "react-icons/tb";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";

import { FaUsersBetweenLines } from "react-icons/fa6";
import Link from 'next/link'

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
            <div className='flex  flex-row bg-pink-200 w-full h-20 fixed shadow justify-between items-center pr-10 z-10'>
                <div className='font-pacifico  flex space-x-2 items-center justify-center text-xl font-semibold text-center '>
                    <Link href="/" passHref>
                        <Image
                            className="bg-pink-100 pl-6 rounded-r-full p-2"
                            src={logo}
                            alt="Company Logo"
                            width={200}
                            height={50}
                            priority={true}
                        />
                    </Link>

                </div>
                <SearchInput data={[]} />
                <div className='flex flex-row justify-between gap-8 items-center'>
                    <div className='ml-3 text-pink-600'>
                        <IoNotificationsSharp size={24} color='blue-500' />
                    </div>
                    <div className='ml-3 text-pink-600'>
                        <Avatar />
                    </div>
                    <div className='ml-3'>
                        <LanguageSelector />
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
                className='bg-pink-100 fixed flex flex-col z-10 gap-8 py-5 px-4   top-20 left-0 h-full shadow-right-only'>



                <button className='flex flex-row w-full justify-end place-items-end ' onClick={toggleMenu}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className='w-7 h-7 stroke-white  stroke-2 p-1 rounded-2xl bg-pink-400  '>
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

                <div className='flex flex-col gap-2 '>
                    <NavigationLink link='/' name='Dashboard' isOpen={isOpen}>
                        <ChartBarIcon className='stroke-inherit  min-w-6 w-6' />
                    </NavigationLink>
                    <NavigationLink link='/campagnes' name='Gestion Campagnes' isOpen={isOpen}>
                        <TbMasksTheater size={32} className='stroke-inherit  min-w-6 w-6' />
                    </NavigationLink>
                    <NavigationLink link='/theatres' name='liste des théâtre' isOpen={isOpen}>
                        <ListBulletIcon className='stroke-inherit  min-w-6 w-6' />
                    </NavigationLink>
                    <NavigationLink link='/acteurs' name='Liste des acteurs' isOpen={isOpen}>
                        <GiClown size={32} className='stroke-inherit  min-w-6 w-6' />
                    </NavigationLink>
                    <NavigationLink link='/spectacles' name='Gestion Spectacles' isOpen={isOpen}>
                        <GiSpectacles size={32} className='stroke-inherit  min-w-6 w-6' />
                    </NavigationLink>
                    <NavigationLink link='/prospects' name='Gestion Prospects' isOpen={isOpen}>
                        <FaUsersBetweenLines size={32} className='stroke-inherit min-w-6 w-6' />
                    </NavigationLink>
                    <NavigationLink link='/reporting' name='Reporting Campagnes' isOpen={isOpen}>
                        <BsFileEarmarkSpreadsheet size={32} className='stroke-inherit min-w-6 w-6' />
                    </NavigationLink>
                    <NavigationLink link='/calendrier' name='Calendrier' isOpen={isOpen}>
                        <IoCalendarNumberOutline size={32} className='stroke-inherit min-w-6 w-6' />
                    </NavigationLink>

                </div>
                <div className='flex flex-col gap-2 bg-white rounded-xl'>
                    <NavigationLink link='#' name='Paramétres' isOpen={isOpen}>
                        <IoSettingsOutline size={32} className='stroke-inherit stroke-[0.75] min-w-6 w-6' />
                    </NavigationLink>
                    <div onClick={() => signOut()}>
                        <NavigationLink link='#' name='Déconnecter' isOpen={isOpen}>
                            <GrPowerShutdown size={18} className="stroke-inherit stroke-[0.75] min-w-6 w-6'" />

                        </NavigationLink>
                    </div>

                </div>
            </motion.nav>
        </>

    )
}
