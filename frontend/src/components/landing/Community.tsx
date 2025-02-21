import { motion } from "framer-motion";

const Community = ({ isHeroAlmostOut }: { isHeroAlmostOut: boolean }) => {
  const images = [
    "/Community/community_2.jpg",
    "/Community/community_1.jpg",
    "/Community/community_3.jpg",
  ];

  return (
    <motion.div
      className="w-full h-screen background flex flex-col justify-center items-center gap-4 px-20"
      initial={{ x: -150, opacity: 0 }} // Start off-screen to the left
      animate={isHeroAlmostOut ? { x: 0, opacity: 1 } : {}} // Slide in to position
      transition={{
        type: "spring",
        stiffness: 100, // Controls speed (higher = faster)
        damping: 10, // Controls bounce effect (lower = more bounce)
      }}
    >
      <div className="flex items-center gap-10 mb-10">
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
      </div>

      <div className="flex flex-col gap-8 px-20 text-center">
        <div className="text-3xl">Welcome to the CollabIT CCTC Community!</div>

        <div className="text-lg">
          CollabIT CCTC is more than just a platform—it’s a thriving community
          where IT students from Consolatrix College of Toledo City come
          together to share ideas, exchange knowledge, and grow in the world of
          technology. Whether you're posting insights, exploring the latest tech
          trends, or collaborating with fellow students through our chat system,
          you'll always find support and inspiration from like-minded peers.
        </div>

        <div className="font-bold text-xl">
          Join us in building a space where learning meets innovation, and where
          every student’s voice matters. Let’s connect, create, and
          innovate—together! 🚀
        </div>
      </div>
    </motion.div>
  );
};

export default Community;
