import React from "react";
import { motion, useInView } from "framer-motion";

const ScrollXAnimation = ({ children, className, delay = 0 }) => {
    const { ref } = useInView({
        triggerOnce: true, 
        threshold: 0.5, 
      });
    
    return (
    <div className=" overflow-hidden pb-4">
       <motion.div
          className={className}
          ref={ref}
          initial={{ x: '100%' }}
          whileInView={{ x: 0 }}
          exit={{x: '-100%'}}
          transition={{ duration: 0.75, ease: "easeInOut", delay }}
        >
          {children}
        </motion.div>
    </div>
  );
};

export default ScrollXAnimation;
