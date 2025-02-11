import { Avatar, TextField } from "@mui/material";

const Navbar = () => {
  return (
    <div
      className="flex items-center justify-between px-10"
      style={{ height: "10vh", backgroundColor: "#02353C" }}
    >
      <div className="inline-flex items-center w-2/4">
        <div className="me-5">AniVerse</div>
        <div className="w-full">
          <TextField
            className="w-full"
            placeholder="Search"
            variant="outlined"
            size="small"
          />
        </div>
      </div>
      <div className="flex items-center">
        <Avatar
          src="https://i.pinimg.com/236x/1c/f2/09/1cf20978bf4f2967c5e6083e6243965b.jpg"
          className="profile-avatar me-3"
        />
        <div>User</div>
      </div>
    </div>
  );
};

export default Navbar;
