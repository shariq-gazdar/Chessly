"use client";
import { useAuthContext } from "@/context/userContext";
import Link from "next/link";
import React from "react";
type Props = {
  children: React.ReactNode;
  color: "string" | any;
  href: any;
};
function ProtectedButtons({
  children,
  color = "red",
  href = "bot-dashboard",
}: Props) {
  const { user } = useAuthContext();
  return (
    <Link
      className={` my-3 text-center text-[16px] p-3 rounded-full w-[15rem] cursor-pointer ${
        color == "red"
          ? "bg-red hover:bg-red/85"
          : "bg-surface hover:bg-surface/85"
      }`}
      href={user ? href : "signup"}
    >
      {children}
    </Link>
  );
}

export default ProtectedButtons;
