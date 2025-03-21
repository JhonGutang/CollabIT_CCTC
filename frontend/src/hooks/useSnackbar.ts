import { useState } from "react";

type SnackbarType = "success" | "error";

interface SnackbarState {
  open: boolean;
  message: string;
  type: SnackbarType;
}

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    type: "success",
  });

  const showSnackbar = (message: string, type: SnackbarType) => {
    setSnackbar({
      open: true,
      message,
      type,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return { snackbar, showSnackbar, handleCloseSnackbar };
};
