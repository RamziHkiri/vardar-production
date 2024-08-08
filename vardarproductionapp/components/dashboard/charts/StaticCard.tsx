"use client";
import React, { Children } from 'react'

interface StaticCardProps {
    title: string;
    total: number;
    children: React.ReactNode;
}

export default function StaticCard({ title, total, children }: StaticCardProps) {
    return (
        <div className='w-1/3 bg-slate-100 rounded-xl border h-32 flex flex-row items-center justify-around'>
            <div className='flex flex-col gap-4'>
                <p className='text-neutral-600'>{title}</p>
                <p className='text-3xl font-bold'>{total}</p>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
