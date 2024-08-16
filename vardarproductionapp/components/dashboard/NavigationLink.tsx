"use clie"
import Link from 'next/link';
import React from 'react'
interface NavigationLinkProps {
    children: React.ReactNode;
    name: string;
    link: string ;
    isOpen: boolean;

}

export default function NavigationLink({ children, name, link, isOpen }: NavigationLinkProps) {
    return (
        <Link href={link}
        title={name}
            className='gap-3 p-1 flex h-10 w-full text-sm rounded cursor-pointer stroke-[0.75] hover:stroke-white stroke-neutral-900 text-neutral-900 hover:text-white place-items-center  hover:bg-pink-500 transition-colors duration-100  '>
            {children}
            {isOpen && <p className='text-inherit overflow-clip whitespace-nowrap tracking-wide'>
                {name}
            </p>}
        </Link>
    )
}
