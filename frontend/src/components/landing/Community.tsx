import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Community = ({ isHeroAlmostOut }: { isHeroAlmostOut: boolean }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const images = [
    "/Community/community_2.jpg",
    "/Community/community_1.jpg",
    "/Community/community_3.jpg",
  ];

  return (
    <motion.div
      className="w-full h-screen background flex flex-col justify-center items-center gap-4 px-20"
      initial={{ x: -150, opacity: 0 }} 
      animate={isHeroAlmostOut ? { x: 0, opacity: 1 } : {}} 
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10, 
      }}
    >
      {isDesktop ? (<div className="flex items-center gap-10 mb-10">
        {images.map((image, index) => (
          <div key={index} className={`relative ${index === 1 ? "scale-125" : "blur-effect"}`}>
            <img
              src={image}
              alt={`Community ${index}`}
              className="border-2 border-white rounded-xl"
              style={{ width: index === 1 ? "210px" : "200px", height: "200px" }}
            />
          </div>
        ))}
      </div>) : (
        <div>
          <img src={images[0]} alt=""  className="border-2 border-white rounded-xl" />
        </div>
      )}
      

      <div className="flex flex-col gap-8 lg:px-20 text-center">
        <div className="lg:text-3xl text-2xl">Welcome to the CollabIT CCTC Community!</div>

        <div className="lg:text-lg">
          CollabIT CCTC is more than just a platform—it&apos;s a thriving community
          where IT students from Consolatrix College of Toledo City come
          together to share ideas, exchange knowledge, and grow in the world of
          technology. Whether you&apos;re posting insights, exploring the latest tech
          trends, or collaborating with fellow students through our chat system,
          you&apos;ll always find support and inspiration from like-minded peers.
        </div>

        <div className="font-bold lg:text-xl ">
          Join us in building a space where learning meets innovation, and where
          every student&apos;s voice matters. Let&apos;s connect, create, and
          innovate—together! 🚀
        </div>
      </div>
    </motion.div>
  );
};

export default Community;
