'use client';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import Navbar from '@/components/landing/Navbar'


interface ApiResponse {
  message: string
}

export default function Home() {
  return (
    <div className='bg-white h-screen text-black'>
      <Navbar/>
      <Hero/>
      <Footer/>
    </div>
  );
}
