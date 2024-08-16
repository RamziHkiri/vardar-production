"use client";
import { GrPowerShutdown } from "react-icons/gr";
import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import React from 'react';

export default function LogoutBtn() {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/signin');
        router.refresh(); 
        
    };

    return (
        <div className='border-2 bg-pink-400 border-pink-300 p-2 rounded-full cursor-pointer'
            onClick={handleSignOut}>
            <GrPowerShutdown size={18} className="stroke-white"/>
        </div>
    );
}
