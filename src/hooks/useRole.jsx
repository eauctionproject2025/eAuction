"use client";
import { useSession } from "next-auth/react";

export const useRole = () => {
  const { data: session } = useSession();
  return session?.user?.role;
};
