"use client";

import { getAllUsers } from "@/services/userService";
import React, { useEffect, useState } from "react";
import Users from "./Users";

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserProp {
    currentUser: (user: User) => void
}

const UsersList:React.FC<UserProp> = ({currentUser}) => {
  const [users, setUsers] = useState<User[]>([]);

  const handleUserClick = (user: User) => {
    currentUser(user);
}

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);
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
