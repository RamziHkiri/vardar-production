import React from 'react'
interface TextAreaProps{
    description: string;
    placeholder?: string;
    label: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export default function TextArea({description, setDescription, label, placeholder}: TextAreaProps) {
    return (
        <div className='w-full'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
                {label}
            </label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={placeholder}
                rows={4}
                className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-pink-400'
            />
        </div>
    )
}
