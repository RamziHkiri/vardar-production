import React from 'react'
import LoginForm from './components/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className=''>
      <div className='flex items-center justify-center h-12 bg-blue-700 text-white font-semibold text-center'>
        <p>© 2024 Vardar Production. All rights reserved.</p>
      </div>
      <div className="h-screen w-full flex items-center justify-center bg-gray-100">
        <div className='p-10 bg-white rounded-md shadow-lg w-full sm:w-3/4 lg:w-auto'>
          <div className='font-sans flex space-x-2 items-center justify-center text-4xl font-semibold text-center mb-12'>
            <h1 className=' text-red-700'>
              Vardar
            </h1>
            <h1 className='text-blue-800'>
              Production
            </h1>

          </div>

          {/*<h3 className='text-xl font-semibold text-center text-neutral-700' >
            Se Connecter
          </h3>*/}
          <hr className='my-5' />
          <LoginForm />
        </div>
      </div>
    </div>

  )
}
