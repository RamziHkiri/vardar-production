import React, { ChangeEvent } from 'react'

interface InputProps {
    value?: any;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    type?: string;
    placeholder?: string ,
    label: string;
}

export default function Input({ value, type, onChange, disabled, label, placeholder }: InputProps) {
    return (
        <div className='relative w-full lg:w-[30rem]'>
            <input
                placeholder= {placeholder || undefined }
                value={value}
                onChange={onChange}
                disabled={disabled}
                type={type}
                className='outline-none p-4 border-2 border-pink-50 w-full rounded-md peer focus:border-pink-400 disabled:bg-pink-50  placeholder:translate-y-2 placeholder:text-gray-400'
            />
            <label className='font-semibold capitalize absolute top-0 left-3 scale-60 peer-focus-within:scale-80 peer-focus-within:-top-2 peer-focus-within:bg-white peer-focus-within:px-2 px-0 bg-transparent
            transition-all duration-200 ease-in-out '>
                {label}
            </label>
        </div>
    )
}
