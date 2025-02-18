import { Avatar } from "@mui/material";

const Navbar = () => {
  return (
    <div className="h-[10vh] flex items-center justify-between p-7">
      <div className="flex items-center">
        <Avatar src="/logo.png" sx={{ width: "70px", height: "70px" }} />
        <div className="text-xl">CollabIT CCTC</div>
      </div>

      <div className="flex items-center  w-1/3 justify-between">
        <div className="flex gap-10">
          <div>Home</div>
          <div>Community</div>
          <div>About Us</div>
        </div>

        <div className="">
          <div>Sign In</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
