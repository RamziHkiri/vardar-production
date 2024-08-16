import React from 'react'
import LoginForm from './components/LoginForm'
import Link from 'next/link'
import Image from 'next/image'
import logo from "@/app/images/logo.png"


export default function LoginPage() {
  return (
    <div className=''>
      <div className='flex items-center justify-center h-12 bg-pink-400 text-white font-semibold text-center'>
        <p>© 2024 Vardar Production. All rights reserved.</p>
      </div>
      <div className="h-screen w-full flex items-center justify-center bg-gray-100">
        <div className='p-10 bg-white rounded-md shadow-lg w-full sm:w-3/4 lg:w-auto'>
          <div className='font-pacifico  flex space-x-2 items-center justify-center text-xl font-semibold text-center '>
            <Image className=' rounded-r-full p-2'
              src={logo}
              alt="Company Logo"
              width={250}
              height={50}
              priority={true}
            />

          </div>


          <hr className='my-5' />
          <LoginForm />
        </div>
      </div>
    </div>

  )
}
