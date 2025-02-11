import Navbar from "./components/Navbar";
import { ReactNode } from "react";
import LeftDrawer from "./components/LeftDrawer";
import { Container } from "@mui/material";
import PageAuthenticator from "./pageAuthenticator";
interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <PageAuthenticator>
      <Navbar />
      <div className="flex ">
        <div>
          <LeftDrawer />
        </div>
        <div className=" w-full  p-5 !important" style={{ height: "90vh", overflowY: "scroll" }}>
          {children}
        </div>
      </div>
    </PageAuthenticator>
  );
};

export default BaseLayout;
