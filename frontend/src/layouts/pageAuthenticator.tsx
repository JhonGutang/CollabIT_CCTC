'use client'

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface PageAuthenticatorProps {
  children: ReactNode;
}

const PageAuthenticator = ({ children }: PageAuthenticatorProps) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/auth");
    }
  }, []);

  const token = localStorage.getItem("authToken");

  if (!token) {
    return null; 
  }

  return <>{children}</>;
};

export default PageAuthenticator;
