import React from "react";
import { motion } from "framer-motion";
const Yanimation = ({ children, heading, className, delay = 0, duration }) => {
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
      {/* {heading ? (
        <motion.h1
          className={className}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{duration: duration || 0.5, delay}}
        >
          {children}
        </motion.h1>
      ) : (
        <motion.h2
          className={className}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{duration: duration || 0.5, delay}}
        >
          {children}
        </motion.h2>
      )} */}
    </div>
  );
};

export default Yanimation;
