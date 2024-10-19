import React from 'react'
import Post from './Post'
import prisma from '../../../lib/client'
import { auth } from '@clerk/nextjs/server'

const Feed = async ({ username }: { username?: string }) => {
  let posts: any[] = []
  const { userId } = auth()
  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username
        }
      },
      include: {
        user: true,
        likes: {
          select: { userId: true }
        }
        ,
        _count: {
          select: { comments: true }
        }
      }
      , orderBy: { createdAt: "desc" }

    })
  } else if (!username && userId) {
    console.log("no user name only id");

    const following = await prisma.follower.findMany({
      where: {
        followerId: userId
      }, select: { followingId: true }


    })
    const followingids = following.map((f) => f.followingId)
    followingids
    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: followingids
        }
      },
      include: {
        user: true,
        likes: {
          select: { userId: true }
        }
        ,
        _count: {
          select: { comments: true }
        }
      }
      , orderBy: { createdAt: "desc" }
    })
    console.log(posts)
  }





  return (
    <div className='bg-white rounded-lg p-5 flex flex-col items-center justify-center gap-5'>
      {posts.length ? (posts?.map(post => <Post key={post.id} post={post}></Post>)) : "no posts"}






    </div>
  )
}

export default Feed