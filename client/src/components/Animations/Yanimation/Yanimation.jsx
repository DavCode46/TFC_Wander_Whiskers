import React from "react";
import { motion } from "framer-motion";
const Yanimation = ({ children, className, delay = 0, duration }) => {
  return (
    <div className=" overflow-hidden pb-4">
       <motion.div
          className={className}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{duration: duration || 0.5, delay}}
        >
          {children}
        </motion.div>

    </div>
  );
};

export default Yanimation;
