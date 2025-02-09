import Navbar from '@/components/Navbar';
import { ReactNode } from 'react';
import LeftDrawer from './components/LeftDrawer';
import { Container } from '@mui/material';
interface BaseLayoutProps {
  children: ReactNode; 
}



const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (

    <div className='flex h-[100vh]'>
      <div>
        <LeftDrawer/>
      </div>
      <main className='h-full w-full'>{children}</main>
    </div>
  );
};

export default BaseLayout;
