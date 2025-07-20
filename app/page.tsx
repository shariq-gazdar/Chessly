"use client";
import IconRenderer from "@/components/IconRenderer";
import Image from "next/image";
import homepageChess from "@/assets/homepageChess.png";
import Link from "next/link";
import { useAuthContext } from "@/context/userContext";
import UserBadge from "@/components/UserBadge";
import ProtectedButtons from "@/components/ProtectedButtons";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <main className="flex w-[100vw] h-[100vh] justify-center items-center flex-col relative">
      <div className="absolute top-5 right-5">
        <UserBadge />
      </div>
      <div className="relative">
        <Image
          src={"/homepage/Crown.png"}
          width={25}
          height={25}
          alt="crown"
          className="absolute -left-5 -top-1 -rotate-45"
        />
        <h1 className="font-heading text-[35px] tracking-widest">Chessly</h1>
      </div>
      <ProtectedButtons color="gray" href="bot-dashboard">
        Play v/s Bot
      </ProtectedButtons>
      <ProtectedButtons color="red" href="player-dashboard">
        Play v/s Bot
      </ProtectedButtons>

      <Image
        src={"/homepage/homepageChess.png"}
        width={250}
        height={250}
        alt="takedown"
        className="absolute bottom-0 right-0"
      />
    </main>
  );
}
