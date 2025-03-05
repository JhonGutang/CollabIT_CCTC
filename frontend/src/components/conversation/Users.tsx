import { Button } from "@mui/material";
import AvatarWithName from "../AvatarWithContents";

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserProps {
  user: User;
  textColor: string
}

const Users: React.FC<UserProps> = ({ user, textColor }) => {
  console.log(user);
  return (
    <Button className="users w-full" sx={{ color:  textColor }}>
        <AvatarWithName name={user.username} avatarLink={user.avatarLink} />
    </Button>
  );
};

export default Users;
