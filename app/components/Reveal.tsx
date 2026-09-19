"use client";
import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  id,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} id={id}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};
