import React from 'react'
import Image from 'next/image'

const Sponsoredads = () => {
  return (
    <div className='bg-white shadow p-3 rounded my-3  '>
      <div className='w-full flex justify-between items-center'>
        <div className="text-gray-400 font-bold text-sm ">Sponsored ADS</div>

        <Image src="/more.png" width={20} height={20} alt=""></Image>



      </div>
      <div className='relative h-[120px] w-full mt-2'>
        <Image className='rounded-lg' src="/ads.jpg" fill alt=""></Image>
      </div>

      <div className='flex flex-col items-start mt-2'>
        <div className='text-blue-500 font-bold text-sm cursor-pointer'>click for more</div>
        <div className='text-xs text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. At esse iure vero, aspernatur nesciunt nostrum asperiores consectetur adipisci, inventore eveniet ipsa illum eius architecto, voluptates laudantium provident sit dolores tempore.</div>
      </div>






    </div>
  )
}

export default Sponsoredads