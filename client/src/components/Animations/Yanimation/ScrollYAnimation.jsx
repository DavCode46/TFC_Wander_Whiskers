import React from "react";
import { motion, useInView } from "framer-motion";

const ScrollYanimation = ({ children, className, delay = 0 }) => {
    const { ref } = useInView({
        triggerOnce: true, 
        threshold: 0.5, 
      });
    
    return (
    <div className=" overflow-hidden p-3">
       <motion.div
          className={className}
          ref={ref}
          initial={{ y: '100%' }}
          whileInView={{ y: 0 }}
          exit={{y: '-100%'}}
          transition={{ duration: 0.75, ease: "easeInOut", delay }}
        >
          {children}
        </motion.div>
    </div>
  );
};

export default ScrollYanimation;
