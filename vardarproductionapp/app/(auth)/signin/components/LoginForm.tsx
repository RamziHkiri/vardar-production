"use client"

import Input from '@/components/Input'
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const login = async () => {
        setLoading(true);

        const login = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (login?.ok) {
            toast.success("Connexion réussie!");
            window.location.assign("/");
        } else if(login?.error) {
            toast.error(login?.error);
        }
        setLoading(false);
    }


    return (
        <div className='flex flex-col justify-center space-y-5 items-center'>
            <Input label='email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
            <Input label='mot de passe' type='password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />


            <div className='flex flex-col justify-center items-center space-x-32 '>
                <div className='text-sm text-center text-neutral-500 mt-5'>
                    Mot de passe <Link href={'/'} className='font-bold text-neutral-900'>Oublié</Link>
                </div>
                <div onClick={login} className='px-10 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-70 cursor-pointer'>
                    Se Connecter
                </div>
            </div>

        </div>

    )
}
