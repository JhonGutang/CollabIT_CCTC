import Navbar from "./components/Navbar";
import { ReactNode } from "react";
import LeftDrawer from "./components/LeftDrawer";
import PageAuthenticator from "./pageAuthenticator";
import Announcement from "@/components/sidebar/Announcement";
import Contacts from "@/components/sidebar/Contacts";
interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <PageAuthenticator>
      <div className="bg-white h-[100vh]">
        <div className="flex gap-5 py-5 px-4">
          <div>
            <LeftDrawer />
          </div>
          <div className="w-full h-full">
            <Navbar />
            <div
              className=" w-full mt-4 p-5 flex gap-8"
              style={{ height: "83vh", overflowY: "scroll" }}
            >
              <div>{children}</div>
              <div className="text-black w-full flex flex-col items-end justify-end gap-5 px-10 sticky top-0">
                <Announcement />
                <Contacts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageAuthenticator>
  );
};

export default BaseLayout;
