import React from "react";
import { motion, useScroll, useInView } from "framer-motion";

const ScrollYanimation = ({ children, heading, className, delay = 0, duration }) => {
    const { ref } = useInView({
        triggerOnce: true, // Esta opción asegura que la animación solo se active una vez
        threshold: 0.5, // Define cuánto del elemento debe estar en la vista para activar la animación
      });
      const { scrollYProgress } = useScroll();
    
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
