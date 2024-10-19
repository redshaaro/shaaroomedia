import Image from 'next/image'
import React from 'react'
import Profilecard from './Profilecard'

const Leftmenu = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className='flex flex-col gap-6'>
      {type==="home"&&<Profilecard></Profilecard>}
    <div className='  flex flex-col items-center justify-center gap-5 bg-white p-4 border-gray-300  shadow rounded-lg'>
      <div className='flex items-center gap-3  w-full hover:bg-slate-400 p-1 rounded cursor-pointer'>
        <Image src="/posts.png" alt="" width={20} height={20}></Image>
        <div className=" text-gray-600 text-sm">My posts</div>

      </div>
      <div className='flex items-center gap-3  w-full hover:bg-slate-400 p-1 rounded cursor-pointer'>
        <Image src="/activity.png" alt="" width={20} height={20}></Image>
        <div className=" text-gray-600 text-sm">Activity</div>

      </div>
      <div className='flex items-center gap-3  w-full hover:bg-slate-400 p-1 rounded cursor-pointer'>
        <Image src="/market.png" alt="" width={20} height={20}></Image>
        <div className=" text-gray-600 text-sm">Market place</div>

      </div>
      <div className='flex items-center gap-3  w-full hover:bg-slate-400 p-1 rounded cursor-pointer'>
        <Image src="/events.png" alt="" width={20} height={20}></Image>
        <div className=" text-gray-600 text-sm">Events</div>

      </div>
      <div className='flex items-center gap-3  w-full hover:bg-slate-400 p-1 rounded cursor-pointer'>
        <Image src="/albums.png" alt="" width={20} height={20}></Image>
        <div className=" text-gray-600 text-sm">Albums</div>

      </div>
      <div className='flex items-center gap-3  w-full hover:bg-slate-400 p-1 rounded cursor-pointer'>
        <Image src="/videos.png" alt="" width={20} height={20}></Image>
        <div className=" text-gray-600 text-sm">Videos</div>

      </div>
      <div className='flex items-center gap-3  w-full hover:bg-slate-400 p-1 rounded cursor-pointer'>
        <Image src="/news.png" alt="" width={20} height={20}></Image>
        <div className=" text-gray-600 text-sm">News</div>

      </div>
      <div className='flex items-center gap-3  w-full hover:bg-slate-400 p-1 rounded cursor-pointer'>
        <Image src="/courses.png" alt="" width={20} height={20}></Image>
        <div className=" text-gray-600 text-sm">Courses</div>

      </div>
      <div className='flex items-center gap-3  w-full hover:bg-slate-400 p-1 rounded cursor-pointer'>
        <Image src="/lists.png" alt="" width={20} height={20}></Image>
        <div className=" text-gray-600 text-sm">Lists</div>

      </div>
      <div className='flex items-center gap-3  w-full hover:bg-slate-400 p-1 rounded cursor-pointer'>
        <Image src="/settings.png" alt="" width={20} height={20}></Image>
        <div className=" text-gray-600 text-sm">Settings</div>

      </div>


    </div>
    </div>
  )
}

export default Leftmenu