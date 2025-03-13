import { Button } from "@mui/material";
import AvatarWithName from "../AvatarWithContents";
import { User } from '@/types/user'

export interface UserProps {
  user: User;
  textColor: string
}

const Users: React.FC<UserProps> = ({ user, textColor }) => {
  return (
    <Button className="users w-full" sx={{ color:  textColor }}>
        <AvatarWithName name={user.username} avatarLink={user.avatarLink} />
    </Button>
  );
};

export default Users;
