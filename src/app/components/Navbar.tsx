import Link from 'next/link'
import React from 'react'
import Mobilemenu from './Mobilemenu'
import Image from 'next/image'
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import { SignedIn, SignedOut } from '@clerk/nextjs'

const Navbar = () => {
    return (
        <nav className=' flex items-center justify-between py-4 '>
            <div className="sm:hidden md:block">
                <Link className='text-blue-500 text-xl font-bold' href="/">
                    Shaaroo

                </Link>

            </div>
            <div className="hidden sm:flex sm:justify-around sm:gap-2 sm:items-center text-gray-600 text-sm ">
                <div className='flex justify-center items-center gap-2'>
                    <Image src="/home.png" alt="homepage" width={16} height={16}></Image>
                    <Link href="/">Home</Link>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <Image src="/friends.png" alt="friends" width={16} height={16}></Image>
                    <Link href="/">Friends</Link>
                </div>


                <div className='flex justify-center items-center gap-2'>
                    <Image src="/stories.png" alt="stories" width={16} height={16}></Image>
                    <Link href="/">Stories</Link>


                </div>



            </div>
            <div className="w-full lg:max-w-sm min-w-[200px] hidden sm:block sm:max-w-[20rem] md:max-w-[10rem]">
                <div className="relative">
                    <input
                        className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    />
                    <label className="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
                        Search
                    </label>
                </div>
            </div>
            <div className="right flex justify-between items-center gap-3">
                <ClerkLoading >
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />

                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn><div className='flex justify-between items-center gap-3'>
                        <Image className='cursor-pointer hidden md:block' src="/people.png" width={20} height={20} alt="people"></Image>
                        <Image className='cursor-pointer hidden md:block' src="/messages.png" alt="" width={20} height={20} />
                        <Image className='cursor-pointer hidden md:block' src="/notifications.png" alt="" width={20} height={20} />
                        <UserButton></UserButton>


                    </div>
                    </SignedIn>
                    <Mobilemenu></Mobilemenu>


                    <SignedOut>


                    </SignedOut>

                </ClerkLoaded>




            </div>

        </nav>
    )
}

export default Navbar