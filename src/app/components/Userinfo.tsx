import prisma from "../../../lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import Updateuser from "./Updateuser";
import Userinfocardinteractions from "./Userinfocardinteractions";

const Userinfo = async ({ userid }: { userid: string }) => {
  // Fetch the user data from the database
  const user = await prisma.user.findUnique({
    where: { id: userid },
  });

  if (!user) {
    return <div>User information not available</div>;
  }

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;
  let isFollowRequestReceived = false; // New flag to track if the current user has received a follow request

  const { userId: currentUserId } = auth();

  if (currentUserId) {
    // Check if the current user has blocked the profile user
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userid,
      },
    });
    isUserBlocked = !!blockRes;

    // Check if the current user is following the profile user
    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userid,
      },
    });
    isFollowing = !!followRes;

    // Check if the current user has sent a follow request to the profile user
    const followReqRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: userid,
      },
    });
    isFollowingSent = !!followReqRes;

    // Check if the profile user (User B) has sent a follow request to the current user (User A)
    const followReqFromProfileUser = await prisma.followRequest.findFirst({
      where: {
        senderId: userid,
        receiverId: currentUserId,
      },
    });
    isFollowRequestReceived = !!followReqFromProfileUser;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        {currentUserId === userid ? (
          <Updateuser user={user} />
        ) : (
          <Link href="/" className="text-blue-500 text-xs">
            See all
          </Link>
        )}
      </div>
      
      {/* BOTTOM */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">
            {user.surname ? `${user.name} ${user.surname}` : user.username}
          </span>
          <span className="text-sm">@{user.username}</span>
        </div>
        {user.description && <p>{user.description}</p>}
        {user.city && (
          <div className="flex items-center gap-2">
            <Image src="/map.png" alt="" width={16} height={16} />
            <span>
              Living in <b>{user.city}</b>
            </span>
          </div>
        )}
        {user.school && (
          <div className="flex items-center gap-2">
            <Image src="/school.png" alt="" width={16} height={16} />
            <span>
              Went to <b>{user.school}</b>
            </span>
          </div>
        )}
        {user.work && (
          <div className="flex items-center gap-2">
            <Image src="/work.png" alt="" width={16} height={16} />
            <span>
              Works at <b>{user.work}</b>
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          {user.website && (
            <div className="flex gap-1 items-center">
              <Image src="/link.png" alt="" width={16} height={16} />
              <Link href={user.website} className="text-blue-500 font-medium">
                {user.website}
              </Link>
            </div>
          )}
          <div className="flex gap-1 items-center">
            <Image src="/date.png" alt="" width={16} height={16} />
            <span>2024</span>
          </div>
        </div>

        {/* User Interactions */}
        {currentUserId && currentUserId !== user.id && (
          <Userinfocardinteractions
            userId={user.id}
            isUserBlocked={isUserBlocked}
            isFollowing={isFollowing}
            isFollowingSent={isFollowingSent}
            isFollowRequestReceived={isFollowRequestReceived} // Pass this prop to handle friend request acceptance
          />
        )}
      </div>
    </div>
  );
};

export default Userinfo;
