import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Hero = () => {
  const router = useRouter();

  const redirectToAuth = () => {
    router.push("/auth");
  };

  return (
    <div className="h-[70vh] flex overflow-hidden">
      <div className="h-full w-2/3 flex flex-col gap-5 justify-center items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-3xl flex gap-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
              >
                Think IT, 
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              >
                Share IT,
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
              >
                Build IT
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
          >
            <div className="text-gray-600">
              Empowering IT Students to Build, Share & Inspire!
            </div>
          </motion.div>
        </div>

        <div className="w-90">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
          >
            <Button
              onClick={redirectToAuth}
              variant="contained"
              sx={{ width: "15vw", height: '45px' }}
              className="custom-border-radius"
            >
              Join now
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="h-full w-full flex">
        <motion.div
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }} 
        >
          <img
            src="hero_bg.png"
            alt="Team Collaboration"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
