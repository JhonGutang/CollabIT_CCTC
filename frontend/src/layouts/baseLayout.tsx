import Navbar from "@/components/Navbar";
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
    <div className="flex ">
        <div>
          <LeftDrawer />
        </div>
        <Container sx={{height: '100vh'}} className=" w-full overflow-y-scroll border p-5">{children}</Container>
      </div>
    </PageAuthenticator>
  );
};

export default BaseLayout;
