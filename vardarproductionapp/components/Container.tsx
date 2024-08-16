import React from 'react'

interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <main className=' bg-purple-100 w-full h-full flex flex-row '>
            <div className='flex flex-col pt-16 p p-10 ml-20 w-full gap-5 my-10'>
                {children}
            </div>
        </main>
    )
}
