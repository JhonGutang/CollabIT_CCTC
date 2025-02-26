"use client";

import { getAllUsers, getUserDataFromLocal } from "@/services/userService"; // ✅ Import user data function
import React, { useEffect, useState } from "react";
import Users from "./Users";

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserProp {
  currentUser: (user: User) => void;
}

const UsersList: React.FC<UserProp> = ({ currentUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const currentUserId = getUserDataFromLocal()?.id; 
  const handleUserClick = (user: User) => {
    currentUser(user);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUsers();
      const filteredUsers = allUsers.filter((user) => user.id !== currentUserId); 
      setUsers(filteredUsers);
    };
    fetchUsers();
  }, [currentUserId]); 

  return (
    <div className="flex-2">
      {users.map((user) => (
        <div key={user.id} onClick={() => handleUserClick(user)}>
          <Users user={user} />
        </div>
      ))}
    </div>
  );
};

export default UsersList;
