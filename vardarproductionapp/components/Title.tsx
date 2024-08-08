import React from 'react'
interface TitleProps{
    title: string;
}

export default function Title({title}: TitleProps) {
    return (
        <div>
            <h1 className=' text-3xl text-neutral-700 font-semibold'>{title}</h1>
        </div>
    )
}
