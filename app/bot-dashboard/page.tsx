"use client";
import { useAuthContext } from "@/context/userContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signup");
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <h1 className="font-heading text-[35px] font-extrabold">Play V/S Bot</h1>
      <div className="flex flex-col w-[12rem]">
        <h1 className="font-body">Select Difficulty:</h1>
        <select
          name="difficulty"
          id="difficulty"
          className="bg-red p-2 rounded-2xl my-3"
        >
          <option value="Easy">Easy</option>
          <option value="Easy">Coming Soon...</option>
          <option value="Easy">Coming Soon...</option>
        </select>
        <Link href={{ pathname: "/game" }} className="bg-surface p-2 rounded-2xl hover:bg-surface/85 cursor-pointer">Start Game</Link>
      </div>
    </div>
  );
}

export default Page;
