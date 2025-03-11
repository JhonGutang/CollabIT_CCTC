import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { Home, Boxes, Users  } from "lucide-react";
const Navbar: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const topOffset = section.offsetTop;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full border-black h-[10vh] fixed z-10 lg:bg-white">
      {isDesktop ? (
        <div className="h-full flex items-center justify-between p-7 ">
          <div className="flex items-center">
            <Avatar src="/logo.png" className="w-[70px]" />
            <div className="text-xl">CollabIT CCTC</div>
          </div>

          <div className="flex items-center w-1/3 justify-between">
            <div className="flex gap-10">
              <div
                onClick={() => scrollToSection("home")}
                className="cursor-pointer"
              >
                Home
              </div>
              <div
                onClick={() => scrollToSection("community")}
                className="cursor-pointer"
              >
                Community
              </div>
              <div
                onClick={() => scrollToSection("about-us")}
                className="cursor-pointer"
              >
                About Us
              </div>
            </div>

            <div>
              <div>Sign In</div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" h-full p-5 flex justify-center items-center ">
          <div className=" border-2 rounded-full h-full w-fit px-10 flex items-center justify-center gap-10 bg-white">
            <Home size={30}  onClick={() => scrollToSection("home")} />
            <Boxes size={30} onClick={() => scrollToSection("community")} />
            <Users size={30} onClick={() => scrollToSection("about-us")}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
