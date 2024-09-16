"use client"
import React from 'react'
interface MeilleurCampagneItemProps {
    range: number,
    name: string,
    ville: string,
    total: number
    units: string
}

export default function MeilleurCampagneItem({ range, name, ville, total, units }: MeilleurCampagneItemProps) {
    return (
        <div className='flex flex-row items-center justify-between gap-4 text-white bg-slate-200'>
            <div className=' flex flex-col pt-1 bg-blue-400  w-9 h-9 items-center text-start'>
                {range}
            </div>
            <div className='text-black'>
                {name}/{ville}
            </div>
            <div className='bg-blue-400 rounded-lg w-1/3 text-sm text-right pr-2 h-6'>
                {total}{'  ' + units}
            </div>
        </div>
    )
}
