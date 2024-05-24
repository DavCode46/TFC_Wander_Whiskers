import React from "react";
import { motion } from "framer-motion";
const FadeAnimation = ({ children, delay, className}) => {
  return (
    <motion.div
      className={className}
      initial={{ y: "10px", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
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

export default FadeAnimation;
