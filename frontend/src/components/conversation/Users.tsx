import { Button } from "@mui/material";
import AvatarWithName from "./AvatarWithName";

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserProps {
  user: User;
}

const Users: React.FC<UserProps> = ({ user }) => {
  return (
    <Button className="border users w-full" variant="outlined" sx={{borderColor: 'white', color: 'white'}} >
        <AvatarWithName name={user.username} />
    </Button>
  );
};

export default Users;
