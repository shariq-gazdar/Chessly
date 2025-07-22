"use client";
import { useAuthContext } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import IconRenderer from "./IconRenderer";
import {signOut} from 'firebase/auth'
import { auth } from "@/config/firebase";
function UserBadge() {
  const { user } = useAuthContext();
  const [logout, setLogout] = useState(false);
  const handleLogout = () =>{
    auth.signOut()
    setLogout(false)
  }
  return (
    <div>
      {user ? (
        <div className="flex items-center">
          <Image
            src={user?.photoURL || "/dummy.png"}
            width={40}
            height={40}
            alt="userImage"
            className="rounded-full"
            onClick={() => {
              setLogout(!logout);
            }}
          />
          <h1 className="mx-5 font-heading">
            {user?.displayName || user?.email?.split("@")[0]}
          </h1>
        </div>
      ) : (
        <Link href="signup" className="bg-red hover:bg-red/85 p-2 rounded-4xl ">
          SignUp
        </Link>
      )}
      {logout && (
        <button className="bg-surface p-2 rounded-xl mt-1 text-text"
        onClick={handleLogout}
        >
          LogOut
          <IconRenderer name="LogOut" />
        </button>
      )}
    </div>
  );
}

export default UserBadge;
