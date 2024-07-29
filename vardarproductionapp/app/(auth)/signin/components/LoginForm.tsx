"use client"

import Input from '@/components/Input'
import React, { useState } from 'react'

export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const login = async () => {

    }

    return (
        <div className='flex flex-col justify-center space-y-5 items-center'>
            <Input label='email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
            <Input label='mot de passe' type='password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
            <div onClick={login} className='flex px-10 py-3 bg-blue-600 text-white rounded-full disabled:opacity-70'>
                Login
            </div>
        </div>
        
    )
}
