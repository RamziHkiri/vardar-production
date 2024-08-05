"use clie"
import React from 'react'
interface NavigationLinkProps {
    children: React.ReactNode;
    name: string;
    isOpen: boolean;
}

export default function NavigationLink({ children, name, isOpen }: NavigationLinkProps) {
    return (
        <a href="#" 
        className='flex p-2 rounded cursor-pointer stroke-[0.75] hover:stroke-white stroke-neutral-900 text-neutral-900 hover:text-white place-items-center  hover:bg-blue-500 transition-colors duration-100  '>
            {children}
            {isOpen && <p className='text-inherit overflow-clip whitespace-nowrap tracking-wide'>
                {name}
            </p> }
        </a>
    )
}
