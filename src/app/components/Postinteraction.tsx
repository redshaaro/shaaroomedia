"use client"
import React, { useOptimistic, useState } from 'react'
import Image from 'next/image'
import { Post as postType, User } from '@prisma/client'
import { useAuth } from '@clerk/nextjs'
import { switchLike } from '../../../lib/actions'


type feedPostType = postType & { user: User } & { likes: [{ userId: string }] } & {
    _count: { comments: number }
} & {
    likes: [{ userId: string }]
}

const Postinteraction = ({ postId, likes, comments }: { postId: number, likes: string[], comments: number }) => {
    const { isLoaded, userId: currentuserid } = useAuth();
    const [likeState, setLikeState] = useState({
        likeCount: likes.length,
        isLiked: currentuserid ? likes.includes(currentuserid) : false,
    })

    const [optimisticLike, switchOptimisticLike] = useOptimistic(
        likeState,
        (state, value) => {
            return {
                likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
                isLiked: !state.isLiked,
            };
        }
    );
    console.log(optimisticLike.likeCount)
    console.log(optimisticLike.isLiked)

    const likeAction = async () => {
        switchOptimisticLike("")
        console.log("this is the optimistic like state" + " " + optimisticLike.isLiked)

        try {
            switchLike(postId)

            setLikeState((state) => ({
                likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
                isLiked: !state.isLiked,
            }));



        } catch (err) {
            console.log(err)

        }
    }

    return (
        <div className='w-full'>
            {/* analatics */}
            <div className='bg-slate-100 flex justify-between items-center w-full p-3 rounded-lg'>
                <div className='flex items-center gap-2 text-sm'>


                    <form action={likeAction}>
                        <button>


                            <Image
                                src={optimisticLike.isLiked?"/liked.png":"/like.png"}
                                width={16}
                                height={16}
                                alt=""
                                className="cursor-pointer"
                            />




                        </button>
                    </form>


                    <div className=' h-[18px] border border-gray-300'></div>
                    <div>{optimisticLike.likeCount}</div>

                </div>
                <div className='flex items-center gap-2 text-sm'>
                    <Image src="/comment.png" width={15} height={15} alt=""></Image>
                    <div className='h-[18px] border border-gray-300'></div>
                    <div>{comments}</div>

                </div>
                <div className='flex items-center gap-2 text-sm'>
                    <Image src="/share.png" width={15} height={15} alt=""></Image>
                    <div className='h-[18px] border border-gray-300'></div>
                    <div>share</div>

                </div>

            </div>
        </div>
    )
}

export default Postinteraction