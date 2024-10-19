import React from 'react'
import Image from 'next/image'

const Birthday = () => {
    return (
        <div className='flex justify-between items-center my-4'>
            <div className='flex items-center gap-2'>
                <Image src="/request.jpg" width={40} height={40} className='rounded-full' alt=""></Image>
                <div className='text-black text-sm font-bold'>Jessie klein</div>

            </div>

            <button className='bg-blue-500 text-white font-bold text-xs p-2 rounded-xl cursor-pointer'>Celebrate</button>



        </div>
    )
}

export default Birthday