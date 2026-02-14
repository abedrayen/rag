"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

type SectionWrapperProps = {
  children: ReactNode;
  id: string;
  className?: string;
  title?: string;
  subtitle?: string;
};

export default function SectionWrapper({
  children,
  id,
  className = "",
  title,
  subtitle,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once: false });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const y = useTransform(scrollYProgress, [0, 0.15], [40, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) setHasAnimated(true);
  }, [isInView, hasAnimated]);

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ opacity, y }}
      className={`min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center relative z-10 ${className}`}
    >
      <div className="max-w-5xl mx-auto w-full">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-textMuted max-w-2xl">{subtitle}</p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
