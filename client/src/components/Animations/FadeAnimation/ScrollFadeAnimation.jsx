import React from "react";
import { motion, useInView } from "framer-motion";

const ScrollFadeAnimation = ({ children, delay, className }) => {
  const { ref } = useInView({
    triggerOnce: true, 
    threshold: 0.5, 
  });

  return (
    <motion.div
      className={className}
      ref={ref}
      initial={{ y: "10px", opacity: 0 }}
      whileInView={{y:0, opacity: 1 }}
      exit={{
        y: "50%",
        opacity: 0,
        transition: { duration: 0.25, ease: "easeInOut", delay },
      }}
      transition={{ duration: 0.75, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFadeAnimation;
