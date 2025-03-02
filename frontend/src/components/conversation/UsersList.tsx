"use client";

import { getAllUsers, getUserDataFromLocal } from "@/services/userService"; // ✅ Import user data function
import React, { useEffect, useState } from "react";
import Users from "./Users";
import { useRouter } from "next/navigation";
import { MessageCircleMore } from "lucide-react";
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserProp {
  currentUser?: (user: User) => void;
  location: string
  onUsersFetched?: (users: User[]) => void
}

const UsersList: React.FC<UserProp> = ({ currentUser, location, onUsersFetched }) => {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([]);
  const currentUserId = getUserDataFromLocal()?.id; 
  const handleUserClick = (user: User) => {
    if (currentUser) {
      currentUser(user);
    } else {
      router.push(`conversation?chatUserId=${user.id}`)
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUsers();
      const filteredUsers = allUsers.filter((user) => user.id !== currentUserId); 
      setUsers(filteredUsers);
      if (onUsersFetched) {
        onUsersFetched(filteredUsers);
      }
    };
    fetchUsers();
  }, [currentUserId]); 

  return (
    <div className="flex-2">
      {users.map((user) => (
        <div key={user.id} onClick={() => handleUserClick(user)} className="flex items-center pr-4">
          <Users user={user} textColor={'black'} />
          {location === 'contacts' && (
            <div className="cursor-pointer">
              <MessageCircleMore/>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UsersList;
