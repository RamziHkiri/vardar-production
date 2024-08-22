import Link from 'next/link'
import React from 'react'
import { IoArrowBack } from 'react-icons/io5';
interface RetourButtonProps {
    label: string;
    link: string;
}

export default function RetourButton({ label, link }: RetourButtonProps) {
    return (
        <Link className='flex flex-row justify-center items-center gap-2 text-pink-400  ' href={link}>
            <IoArrowBack />
            <p>{label}</p>
        </Link>
    )
}
