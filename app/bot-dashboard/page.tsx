"use client";

import { useAuthContext } from "@/context/userContext";
import { Router, useRouter } from "next/router";
import { useEffect } from "react";

export const page = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/signup");
    }
  }, [user]);
  return <div>about</div>;
};
