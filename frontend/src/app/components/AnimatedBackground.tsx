import { motion } from "motion/react";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient - white to soft olive tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-50 to-white" />

      {/* Radial olive glow - top left */}
      <div 
        className="absolute top-0 left-0 w-[800px] h-[800px] opacity-[0.12]"
        style={{
          background: "radial-gradient(circle at center, rgb(113, 128, 71), transparent 60%)",
        }}
      />

      {/* Radial olive glow - top right */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.08]"
        style={{
          background: "radial-gradient(circle at center, rgb(132, 148, 85), transparent 70%)",
        }}
      />

      {/* Animated floating orb 1 */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(113, 128, 71, 0.12), transparent 70%)",
        }}
        className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl"
      />

      {/* Animated floating orb 2 */}
      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{
          background: "radial-gradient(circle, rgba(132, 148, 85, 0.1), transparent 70%)",
        }}
        className="absolute top-60 right-1/3 w-80 h-80 rounded-full blur-3xl"
      />

      {/* Animated floating orb 3 */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
          delay: 4,
        }}
        style={{
          background: "radial-gradient(circle, rgba(113, 128, 71, 0.08), transparent 70%)",
        }}
        className="absolute bottom-40 left-1/2 w-72 h-72 rounded-full blur-3xl"
      />

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(113, 128, 71, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(113, 128, 71, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
    </div>
  );
}