"use client"
import { SignedOut } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'


const Mobilemenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <div className=' sm:hidden flex flex-col items-center justify-center gap-1 cursor-pointer' onClick={() => setIsOpen((prev) => !prev)}>
                <div className={`h-1 w-6 bg-blue-600 origin-left rounded-sm ${isOpen ? `rotate-45` : ""} ease-in-out duration-500`}></div>
                <div className={`h-1 w-6 bg-blue-600 rounded-sm ${isOpen ? `opacity-0` : ""} ease-in-out duration-500`}></div>
                <div className={`h-1 w-6 bg-blue-600 origin-left rounded-sm ${isOpen ? `-rotate-45` : ""} ease-in-out duration-500`}></div>
            </div>
            {
                isOpen && (
                    <div className='absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col justify-center items-center gap-8 font-medium text-xl z-10'>
                        <Link href="/">Home</Link>
                        <Link href="/">Profile</Link>
                        <Link href="/">Friends</Link>
                        <Link href="/">Stories</Link>
                        <SignedOut>
                            <Link href="/sign-in">Login</Link>
                            <Link href="/sign-up">Signup</Link>
                        </SignedOut>

                        <Link href="/">Groups</Link>




                        <Link href="/">Settings</Link>



                    </div>
                )
            }
            <div className='hidden sm:flex items-center justify-center gap-2'><SignedOut> <Image src="/noAvatar.png" height={16} width={16} alt="no profile"></Image><div><Link href="/sign-in" className='text-gray-600 text-sm'>Login</Link><span className='text-gray-600'>/</span><Link href="/sign-up" className='text-gray-600 text-sm'>Register</Link></div> </SignedOut></div>
        </div>



    )

}

export default Mobilemenu
