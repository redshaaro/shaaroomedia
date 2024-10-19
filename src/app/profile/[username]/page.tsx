import Feed from "@/app/components/Feed"
import Leftmenu from "@/app/components/Leftmenu"
import Rightmenu from "@/app/components/Rightmenu"
import Image from "next/image"
import prisma from "../../../../lib/client"
import { notFound } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { RedirectToSignIn, SignedOut } from "@clerk/nextjs"

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const username = params.username
  const { userId } = auth()
  const user = await prisma.user.findFirst({
    where: { username: username },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true
        }
      },

    }

  })
  if (!user) return notFound();
  let blocked;
  const res = await prisma.block.findFirst({
    where: {
      blockerId: user.id,
      blockedId: userId as string,

    }
  })
  if (res) { blocked = true } else blocked = false
  if (blocked) {
    return notFound()
  }




  return (
    <div className='flex gap-6 p-5'>
      <SignedOut><RedirectToSignIn></RedirectToSignIn></SignedOut>
      <div className="hidden xl:block w-[20%]"><Leftmenu type="profile"></Leftmenu></div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="relative h-[14rem]">
          <Image src={user?.cover || "/noCover.png"} alt="" className='rounded-md object-cover' fill ></Image>
          <Image src={user?.avatar || "/noAvatar.png"} alt="" width={30} height={30} className='rounded-full absolute w-[5rem] h-[5rem] right-0 left-0 m-auto ring-1 ring-white -bottom-6 object-cover z-10' ></Image>
        </div>
        <div className="flex justify-center items-center mt-[30px] font-bold">{user?.name + " " + user?.surname}</div>
        <div className="flex justify-between items-center my-8">
          <div className="flex flex-col items-center justify-center text-black text-sm font-bold">
            <div>{user?._count.followers}</div>
            <div>followers</div>

          </div>
          <div className="flex flex-col items-center justify-center text-black text-sm font-bold">
            <div>{user?._count.posts}</div>
            <div>posts</div>

          </div>
          <div className="flex flex-col items-center justify-center text-black text-sm font-bold">
            <div>{user?._count.followings}</div>
            <div>follwing</div>

          </div>

        </div>
        <div className="flex flex-col gap-6">
          <Feed username={username}></Feed>


        </div>
      </div>
      <div className="hidden lg:block w-[30%] "><Rightmenu userid={user?.id}></Rightmenu></div>

    </div>
  )
}

export default ProfilePage