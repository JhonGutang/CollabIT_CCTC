"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SearchParamsWrapper = ({ onChatUserId }: { onChatUserId: (id: string | null) => void }) => {
  const searchParams = useSearchParams();
  const chatUserId = searchParams.get("chatUserId");

  useEffect(() => {
    onChatUserId(chatUserId);
  }, [chatUserId, onChatUserId]);

  return null; // This component doesn't render anything
};

export default SearchParamsWrapper;
