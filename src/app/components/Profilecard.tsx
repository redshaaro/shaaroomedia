import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import prisma from '../../../lib/client'

const Profilecard = async () => {
    const { userId } = auth()
    if (!userId) return null
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            _count: {
                select: {
                    followers: true
                }
            }
        }

    })
    console.log(user)



    return (
        <div className='bg-white p-4 border-gray-300  shadow rounded-lg flex flex-col gap-6'>
            <div className='h-20 relative'>
                <Image src={user?.cover || "/noCover.png"} alt="" className='rounded-md object-cover' fill ></Image>
                <Image src={user?.avatar || "/noAvatar.png"} alt="" width={30} height={30} className='rounded-full absolute w-12 h-12 right-0 left-0 m-auto ring-1 ring-white -bottom-6 object-cover z-10' ></Image>

            </div>
            <div className='text-black font-bold text-lg'>{(user?.name && user.surname) ? user.name + " " + user.surname : user?.username}</div>
            <div className='text-gray-500 font-thin text-xs'>{user?._count.followers} followers</div>
            <div className='bg-blue-600 p-1 text-white font-bold text-sm text-center rounded-lg'><Link href={`/profile/${user?.username}`}>My profile</Link></div>





        </div>
    )
}

export default Profilecard