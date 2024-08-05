"use client"
import React, { useEffect, useState } from 'react'
import Input from '@/components/Input'
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {

    useEffect(() => {
        signOut({ redirect: false });
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();


    const register = async () => {
        setLoading(true);
        try {
            await axios.post('/api/register', {
                email,
                password
            });

            toast.success("Votre compte a été créé avec succès")
            router.push('/signin');
        } catch (err: any) {
            console.log(err);
            toast.error(err?.response?.data)
        } finally {
            setLoading(false)
            setEmail("");
            setPassword("");
        }

    }

    return (
        <div className='flex flex-col justify-center space-y-5 items-center'>
            <Input label='email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
            <Input label='mot de passe' type='password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />

            <div onClick={register} className='px-10 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-70 cursor-pointer'>
                Register
            </div>
            <div className='text-sm text-center text-neutral-500 mt-5'>
                Mot de passe <Link href={'/'} className='font-bold text-neutral-900'>Oublié</Link>
            </div>
        </div>

    )
}
