"use client";

import { acceptFollowRequest, declineFollowRequest } from "../../../lib/actions";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type RequestWithUser = FollowRequest & {
    sender: User;
};

const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
    const [requestState, setRequestState] = useState(requests);

    const [optimisticRequests, removeOptimisticRequest] = useOptimistic(
        requestState,
        (state, value: number) => state.filter((req) => req.id !== value)
    );

    const accept = async (requestId: number) => {
        // Optimistically remove the request
        removeOptimisticRequest(requestId);
        try {
            await acceptFollowRequest(requestId); // Use correct request ID
            // Update state after successful accept
            setRequestState((prev) => prev.filter((req) => req.id !== requestId));
        } catch (err) {
            console.error("Error accepting request:", err);
            // Revert in case of error
            setRequestState(requests);
        }
    };

    const decline = async (requestId: number) => {
        // Optimistically remove the request
        removeOptimisticRequest(requestId);
        try {
            await declineFollowRequest(requestId);
            // Update state after successful decline
            setRequestState((prev) => prev.filter((req) => req.id !== requestId));
        } catch (err) {
            console.error("Error declining request:", err);
            // Revert in case of error
            setRequestState(requests);
        }
    };

    return (
        <div className="">
            {optimisticRequests.map((request) => (
                <div className="flex items-center justify-between" key={request.id}>
                    <div className="flex items-center gap-4">
                        <Image
                            src={request.sender.avatar || "/noAvatar.png"}
                            alt=""
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-semibold text-[14px]">
                            {request.sender.name && request.sender.surname
                                ? `${request.sender.name} ${request.sender.surname}`
                                : request.sender.username}
                        </span>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <form action={() => accept(request.id)}>
                            <button type="button">
                                <Image
                                    src="/accept.png"
                                    alt=""
                                    width={20}
                                    height={20}
                                    className="cursor-pointer"
                                />
                            </button>
                        </form>
                        <form action={() => decline(request.id)}>
                            <button type="button">
                                <Image
                                    src="/reject.png"
                                    alt=""
                                    width={20}
                                    height={20}
                                    className="cursor-pointer"
                                />
                            </button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FriendRequestList;
