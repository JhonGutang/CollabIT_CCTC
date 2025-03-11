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
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <PageAuthenticator>
      <div className="custom-background h-[100vh] ">
        <div className="flex gap-5 py-5 lg:px-16">
          {!isMobile && (
            <div>
              <LeftDrawer />
            </div>
          )}
          <div className="w-full h-full px-10">
            <Navbar />
            <div
              className="w-full  mt-4  flex justify-center gap-8 overflow-y-auto h-[81vh]"
            >
              <div className="lg:w-[57%] border-black p-3 w-full">{children}</div>
              {!isMobile && (
                <div className="text-black w-80 flex flex-col items-end justify-end gap-5 sticky top-0 py-2">
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
