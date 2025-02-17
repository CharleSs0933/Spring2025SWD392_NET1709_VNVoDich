import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LazyLoadProps } from "@/types";

const LazyLoad = ({
  children,
  threshold , 
  animationDuration ,
  initialStyle, 
  animateStyle , 
}: LazyLoadProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold,
  });

  return (
    <motion.div
      ref={ref}
      initial={initialStyle}
      animate={inView ? animateStyle : initialStyle}
      transition={{ duration: animationDuration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default LazyLoad;
