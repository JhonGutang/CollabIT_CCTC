import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

type DropdownMenuProps = {
  buttonIcon: React.ReactNode;
  menuItems: { label: string; onClick: () => void }[];
  onClose: () => void;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ buttonIcon, menuItems, onClose }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showDropdown, setShowDropdown] = React.useState(false);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowDropdown((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="relative">
      <Button onClick={toggleDropdown} className="p-2">
        {buttonIcon}
      </Button>
      <Menu
        open={showDropdown}
        anchorEl={anchorEl}
        onClose={() => {
          setShowDropdown(false);
          onClose(); 
        }}
        anchorOrigin={{
          vertical: 'top', 
          horizontal: 'right', 
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownMenu;
