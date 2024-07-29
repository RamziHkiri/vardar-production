import React, { ChangeEvent } from 'react'

interface InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    type?: string;
    label: string;
}

export default function Input({ value, type, onChange, disabled, label }: InputProps) {
    return (
        <div className='relative w-full lg:w-[30rem]'>
            <input
                value={value}
                onChange={onChange}
                disabled={disabled}
                type={type}
                className='outline-none p-4 border-2 border-neutral-300 w-full rounded-md peer focus:border-blue-400 disabled:bg-neutral-600'
            />
            <label className='font-semibold capitalize absolute top-0 left-3 scale-60 peer-focus-within:scale-80 peer-focus-within:-top-2 peer-focus-within:bg-white peer-focus-within:px-2 px-0 bg-transparent
            transition-all duration-200 ease-in-out '>
                {label}
            </label>
        </div>
    )
}
