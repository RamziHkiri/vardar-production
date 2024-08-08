"use client"
import { GrPowerShutdown } from "react-icons/gr";

import { signOut } from 'next-auth/react';
import React from 'react'

export default function LogoutBtn() {
    return (
        <div className='border-2 border-slate-300 p-2 rounded-full '
            onClick={() => {
                signOut();
            }}>
            <GrPowerShutdown size={18} className="stroke-neutral-600"/>
            </div>
    )
}
