"use client";
import { useAuthContext } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
function UserBadge() {
  const { user } = useAuthContext();
  return (
    <div>
      {user ? (
        <div className="flex ">
          <Image
            src={user?.currentUser?.photoURL || "/dummy.png"}
            width={25}
            height={25}
            alt="userImage"
          />
          <h1>{user.currentUser?.displayName}</h1>
        </div>
      ) : (
        <Link href="signup" className="bg-red hover:bg-red/85 p-2 rounded-4xl ">
          SignUp
        </Link>
      )}
    </div>
  );
}

export default UserBadge;
