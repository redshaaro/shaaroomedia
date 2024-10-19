"use client";

import { switchBlock, switchFollow, acceptFollowRequest } from "../../../lib/actions";
import { useOptimistic, useState } from "react";

const UserInfoCardInteraction = ({
    userId,
    isUserBlocked,
    isFollowing,
    isFollowingSent,
    isFollowRequestReceived, // New prop
}: {
    userId: any
    isUserBlocked: boolean;
    isFollowing: boolean;
    isFollowingSent: boolean;
    isFollowRequestReceived: boolean; // New prop
}) => {
    const [userState, setUserState] = useState({
        following: isFollowing,
        blocked: isUserBlocked,
        followingRequestSent: isFollowingSent,
        followRequestReceived: isFollowRequestReceived, // New state
    });

    const follow = async () => {
        switchOptimisticState("follow");
        try {
            await switchFollow(userId);
            setUserState((prev) => ({
                ...prev,
                following: prev.following && false,
                followingRequestSent:
                    !prev.following && !prev.followingRequestSent ? true : false,
            }));
        } catch (err) { }
    };

    const acceptRequest = async () => {
        switchOptimisticState("acceptRequest");
        try {
            await acceptFollowRequest(userId);
            setUserState((prev) => ({
                ...prev,
                followRequestReceived: false,
                following: true,
            }));
        } catch (err) { }
    };

    const block = async () => {
        switchOptimisticState("block");
        try {
            await switchBlock(userId);
            setUserState((prev) => ({
                ...prev,
                blocked: !prev.blocked,
            }));
        } catch (err) { }
    };

    const [optimisticState, switchOptimisticState] = useOptimistic(
        userState,
        (state, value: "follow" | "block" | "acceptRequest") =>
            value === "follow"
                ? {
                    ...state,
                    following: state.following && false,
                    followingRequestSent:
                        !state.following && !state.followingRequestSent ? true : false,
                }
                : value === "acceptRequest"
                    ? {
                        ...state,
                        followRequestReceived: false,
                        following: true,
                    }
                    : { ...state, blocked: !state.blocked }
    );

    return (
        <>
            {optimisticState.followRequestReceived ? (
                <form action={acceptRequest}>
                    <button className="w-full bg-green-500 text-white text-sm rounded-md p-2">
                        Accept Friend Request
                    </button>
                </form>
            ) : (
                <form action={follow}>
                    <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
                        {optimisticState.following
                            ? "Following"
                            : optimisticState.followingRequestSent
                                ? "Friend Request Sent"
                                : "Follow"}
                    </button>
                </form>
            )}
            <form action={block} className="self-end">
                <button>
                    <span className="text-red-400 text-xs cursor-pointer">
                        {optimisticState.blocked ? "Unblock User" : "Block User"}
                    </span>
                </button>
            </form>
        </>
    );
};

export default UserInfoCardInteraction;
