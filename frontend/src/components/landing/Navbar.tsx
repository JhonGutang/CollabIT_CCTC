import { Avatar } from "@mui/material";

const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const topOffset = section.offsetTop;
      window.scrollTo({ top: topOffset, behavior: "smooth" }); 
    }
  };
  
  

  return (
    <div className="h-[10vh] flex items-center justify-between p-7">
      <div className="flex items-center">
        <Avatar src="/logo.png" sx={{ width: "70px", height: "70px" }} />
        <div className="text-xl">CollabIT CCTC</div>
      </div>

      <div className="flex items-center w-1/3 justify-between">
        <div className="flex gap-10">
          <div onClick={() => scrollToSection("home")} className="cursor-pointer">
            Home
          </div>
          <div onClick={() => scrollToSection("community")} className="cursor-pointer">
            Community
          </div>
          <div onClick={() => scrollToSection("about-us")} className="cursor-pointer">
            About Us
          </div>
        </div>

        <div>
          <div>Sign In</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
