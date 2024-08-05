"use client"

import { signOut } from 'next-auth/react';
import React from 'react'

export default function LogoutBtn() {
    return (
        <div className=' text-sm text-center py-2 px-5 rounded-xl text-white bg-blue-500 cursor-pointer'
            onClick={() => {
                signOut();
            }}>
            Déconnexion
            </div>
    )
}
