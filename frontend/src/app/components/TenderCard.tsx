import { Calendar, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface TenderCardProps {
  title: string;
  matchScore: number;
  insight: string;
  deadline: string;
  department: string;
  value?: string;
}

export function TenderCard({
  title,
  matchScore,
  insight,
  deadline,
  department,
  value,
}: TenderCardProps) {
  const [displayScore, setDisplayScore] = useState(0);

  // Animated counter for match score
  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = matchScore / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= matchScore) {
        setDisplayScore(matchScore);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [matchScore]);

  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative"
      style={{ perspective: "1000px" }}
    >
      {/* Hover glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.25 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "linear-gradient(to right, rgb(113, 128, 71), rgb(132, 148, 85))",
        }}
        className="absolute -inset-0.5 rounded-2xl blur"
      />

      {/* Card content */}
      <motion.div
        whileHover={{ rotateX: 2 }}
        transition={{ duration: 0.3 }}
        className="relative h-full bg-white backdrop-blur-sm border border-stone-200 group-hover:border-stone-400 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl"
        style={{ 
          transformStyle: "preserve-3d",
        }}
      >
        {/* Header with match score */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2 transition-colors duration-200" style={{
              color: "rgb(28, 25, 23)"
            }}>
              {title}
            </h3>
            <p className="text-sm text-stone-600">{department}</p>
          </div>
          <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg ml-3 overflow-hidden" style={{
            background: "rgba(113, 128, 71, 0.08)",
            borderColor: "rgba(113, 128, 71, 0.2)",
            borderWidth: "1px",
          }}>
            {/* Shimmer effect */}
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear",
                repeatDelay: 2,
              }}
              style={{
                background: "linear-gradient(to right, transparent, rgba(113, 128, 71, 0.3), transparent)",
              }}
              className="absolute inset-0 w-full h-full"
            />
            <TrendingUp className="w-3.5 h-3.5 relative z-10" style={{ color: "rgb(113, 128, 71)" }} />
            <span className="text-sm font-semibold relative z-10" style={{ color: "rgb(89, 101, 56)" }}>
              {displayScore}%
            </span>
            {/* Pulse indicator */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
              style={{
                background: "rgb(113, 128, 71)",
              }}
              className="absolute right-1 top-1 w-1.5 h-1.5 rounded-full"
            />
          </div>
        </div>

        {/* AI Insight */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className="mb-4 p-3 rounded-xl border transition-all duration-300"
          style={{
            background: "rgba(113, 128, 71, 0.05)",
            borderColor: "rgba(113, 128, 71, 0.15)",
          }}
        >
          <p className="text-sm text-stone-700 leading-relaxed line-clamp-2">
            <span className="font-medium" style={{ color: "rgb(113, 128, 71)" }}>AI Insight:</span>{" "}
            {insight}
          </p>
        </motion.div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-200 group-hover:border-stone-300 transition-colors duration-300">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Calendar className="w-4 h-4" />
              <span>Deadline: {deadline}</span>
            </div>
            {value && (
              <div className="text-sm font-medium" style={{ color: "rgb(113, 128, 71)" }}>
                Value: {value}
              </div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group/btn"
            style={{
              color: "rgb(113, 128, 71)",
            }}
          >
            View Details
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}