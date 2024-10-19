import React from 'react'
import Image from 'next/image'
import Birthday from './Birthday'

const Birthdays = () => {
    return (
        <div className='bg-white shadow p-3 rounded mt-4  '>
            <div className="text-gray-400 font-bold text-sm ">Birthdays</div>
            <Birthday></Birthday>
            <Birthday></Birthday>
            <Birthday></Birthday>
            <Birthday></Birthday>

           

        </div>
    )
}

export default Birthdays