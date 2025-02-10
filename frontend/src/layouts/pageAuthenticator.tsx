'use client'

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserDataFromLocal } from "@/services/userService"; // Import the new function

interface PageAuthenticatorProps {
  children: ReactNode;
}

const PageAuthenticator = ({ children }: PageAuthenticatorProps) => {
  const router = useRouter();

  useEffect(() => {
    const userData = getUserDataFromLocal();
    const token = userData ? userData.authToken : '';

    if (!token) {
      router.push("/auth");
    }
  }, []);

  const userData = getUserDataFromLocal();
  const token = userData ? userData.authToken : '';

  if (!token) {
    return null; 
  }

  return <>{children}</>;
};

export default PageAuthenticator;
