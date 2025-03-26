
import { MotionProps } from "framer-motion";

export const fadeIn = (delay: number = 0): MotionProps => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: 0.3,
    delay: delay / 1000,
    ease: "easeInOut",
  },
});

export const slideUp = (delay: number = 0): MotionProps => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    delay: delay / 1000,
  },
});

export const slideIn = (direction: "left" | "right" = "right", delay: number = 0): MotionProps => ({
  initial: { opacity: 0, x: direction === "right" ? 20 : -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: direction === "right" ? -20 : 20 },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    delay: delay / 1000,
  },
});

export const scaleIn = (delay: number = 0): MotionProps => ({
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.1 },
  transition: {
    duration: 0.3,
    delay: delay / 1000,
    ease: "easeOut",
  },
});

export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { 
    duration: 0.3, 
    ease: "easeInOut" 
  }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.2,
    ease: "easeOut",
  },
};
