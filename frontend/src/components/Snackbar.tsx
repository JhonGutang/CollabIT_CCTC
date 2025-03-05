import React from "react";
import { Snackbar, SnackbarOrigin } from "@mui/material";

interface SnackbarProps {
  message: string;
  open: boolean;
  color: string;
  onClose: () => void;
  autoHideDuration?: number;
  position?: SnackbarOrigin;
}

const CustomSnackbar: React.FC<SnackbarProps> = ({
  message,
  open,
  onClose,
  autoHideDuration = 3000,
  position = { vertical: "top", horizontal: "center" },
  color,
}) => {
  return (
    <Snackbar
      anchorOrigin={position}
      autoHideDuration={autoHideDuration}
      open={open}
      onClose={onClose}
    >
      <div className={`snackbar ${color}`}>
      {message}
      </div>
    </Snackbar>
  );
};

export default CustomSnackbar;
