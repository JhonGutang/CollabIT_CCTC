import { Avatar } from "@mui/material";
import React from "react";

type Props = {
    name: string;
    size?: number;
    flexDirection?: 'row' | 'col';
    avatarLink?: string,
}

const AvatarWithName:React.FC<Props> = ({ name, size, flexDirection = 'row', avatarLink = 'https://i.pinimg.com/236x/1c/f2/09/1cf20978bf4f2967c5e6083e6243965b.jpg'}) => {
    return ( 
        <div className={`flex items-center ${flexDirection === 'col' ? 'flex-col' : ''}`}>
            <Avatar 
                src={avatarLink}
                className={flexDirection === 'col' ? 'mb-2' : 'me-5'} 
                sx={{width: `${size}px`, height: `${size}px`, border: '2px solid black'}}
            />
            <div>{name}</div>
        </div>
     );
}
 
export default AvatarWithName;