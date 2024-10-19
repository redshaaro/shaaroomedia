import React from 'react'
import prisma from '../../../lib/client'
import Friendrequestlist from './Friendrequestlist'

const Friendrequests = async ({ currentuserid }: { currentuserid: string | null }) => {
    const requests = await prisma.followRequest.findMany({
        where: { receiverId: currentuserid as string },
        include: { sender: true }
    })
    return (
        <div className='bg-white shadow p-3 rounded  '>
            <div className='w-full flex justify-between items-center'>
                <div className="text-gray-400 font-bold text-sm ">Friend requests</div>
                <div className='cursor-pointer text-blue-500 text-sm font-bold'>See all</div>

            </div>
            <Friendrequestlist requests={requests}></Friendrequestlist>






        </div>
    )
}

export default Friendrequests