import Navbar from '@/components/navbar';
import { ReactNode } from 'react';

interface BaseLayoutProps {
  children: ReactNode; 
}



const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default BaseLayout;
