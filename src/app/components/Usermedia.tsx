"use server"
import React from 'react'
import Image from 'next/image'
import prisma from '../../../lib/client'
import { auth } from '@clerk/nextjs/server'

const Usermedia = async ({ userid }: { userid: string }) => {
  if (!userid) throw new Error("something went wrong")
  const postswithmedia = await prisma.post.findMany({
    take: 6,
    where: {
      userId: userid as string,

      img: { not: null }
    }


  })
  return (
    <div className='bg-white   p-4 border-gray-300  shadow rounded-lg my-3   '>
      <div className='w-full flex justify-between items-center'>
        <div className='text-gray-400 text-sm font-bold'>Media</div>
        <div className='text-blue-500 text-sm cursor-pointer'>See more</div>

      </div>
      <div className='flex justify-between gap-4   flex-wrap mt-2	'>

        {postswithmedia.length ? postswithmedia.map((post) => (
          <Image key={post.id} src={post.img!} className=' relative w-1/5 h-24' width={100} height={100} alt=""></Image>
        ))
          : ""
        }



      </div>


    </div>
  )
}

export default Usermedia