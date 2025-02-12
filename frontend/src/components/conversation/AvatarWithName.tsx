import { Avatar } from "@mui/material";
import React from "react";

type Props = {
    name: string;
}

const AvatarWithName:React.FC<Props> = ({ name }) => {
    return ( 
        <div className="flex items-center">
            <Avatar src="https://i.pinimg.com/236x/1c/f2/09/1cf20978bf4f2967c5e6083e6243965b.jpg" className="me-5"/>
            <div>{name}</div>
        </div>
     );
}
 
export default AvatarWithName;