import Navbar from "./components/Navbar";
import { ReactNode, useState, useEffect } from "react";
import LeftDrawer from "./components/LeftDrawer";
import PageAuthenticator from "./pageAuthenticator";
import Announcement from "@/components/sidebar/Announcement";
import Contacts from "@/components/sidebar/Contacts";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <PageAuthenticator>
      <div className="bg-white h-[100vh]">
        <div className="flex gap-5 py-5 px-4">
          {!isMobile && (
            <div>
              <LeftDrawer />
            </div>
          )}
          <div className="w-full h-full">
            <Navbar />
            <div
              className="w-full mt-4 p-5 flex gap-8"
              style={{ height: "83vh", overflowY: "scroll" }}
            >
              <div>{children}</div>
              {!isMobile && (
                <div className="text-black w-full flex flex-col items-end justify-end gap-5 px-10 sticky top-0">
                  <Announcement />
                  <Contacts />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageAuthenticator>
  );
};

export default BaseLayout;
