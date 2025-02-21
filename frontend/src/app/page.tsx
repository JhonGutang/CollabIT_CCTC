"use client";
import { useIntersection } from "@/hooks/useIntersection";
import AboutUs from "@/components/landing/AboutUs";
import Community from "@/components/landing/Community";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";

export default function Home() {
  const { elementRef: heroRef, isIntersecting: isHeroAlmostOut } = useIntersection(0.5);

  return (
    <div className="bg-white text-black overflow-auto">
      <Navbar />

      {/* Assign IDs to sections for scrolling */}
      <div id="home" ref={heroRef}>
        <Hero />
      </div>

      <div id="community">
        <Community isHeroAlmostOut={isHeroAlmostOut} />
      </div>

      <div id="about-us">
        <AboutUs />
      </div>

      <Footer />
    </div>
  );
}
