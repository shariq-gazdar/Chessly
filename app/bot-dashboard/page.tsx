"use client";
import { useAuthContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import React from "react";

function page() {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/signup");
    }
  }, [user]);
  return <div>Bot </div>;
}

export default page;
