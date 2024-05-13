import React from "react";
import { motion } from "framer-motion";

const Xanimation = ({ children, delay = 0, duration }) => {
  return (
    <div>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: duration || 0.5, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Xanimation;
