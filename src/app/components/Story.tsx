import Image from 'next/image'
import React from 'react'

const Story = () => {
    return (
        <div className='flex flex-col gap-2 items-center   cursor-pointer '>
            <div className='h-[100] w-[100] relative'>
                <Image src="/trial.jpeg" alt="" fill className='absolute ring rounded-full' ></Image>

            </div>

            <span className='text-gray-300 text-xs font-semibold'>Zeyad</span>



        </div>
    )
}

export default Story