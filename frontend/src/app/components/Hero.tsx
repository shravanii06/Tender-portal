import { Search, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-50 to-white" />
      
      {/* Animated radial glow */}
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(113, 128, 71, 0.2), transparent 70%)",
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-3xl"
      />
      <div 
        style={{
          background: "radial-gradient(circle, rgba(132, 148, 85, 0.15), transparent 70%)",
        }}
        className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full blur-3xl" 
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              background: "rgba(113, 128, 71, 0.08)",
              borderColor: "rgba(113, 128, 71, 0.2)",
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
          >
            <Sparkles className="w-4 h-4" style={{ color: "rgb(113, 128, 71)" }} />
            <span className="text-sm font-medium" style={{ color: "rgb(89, 101, 56)" }}>
              AI-Powered Tender Discovery
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight"
          >
            Discover Government Tenders{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text" style={{
                backgroundImage: "linear-gradient(to right, rgb(113, 128, 71), rgb(132, 148, 85))"
              }}>
                Smarter & Faster
              </span>
              {/* Glow behind text */}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                style={{
                  background: "rgba(113, 128, 71, 0.3)",
                }}
                className="absolute inset-0 blur-2xl -z-10"
              />
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-lg sm:text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            AI-powered recommendations, risk scoring, and real-time alerts
            tailored to your business.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative group">
              {/* Animated gradient border */}
              <motion.div
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                style={{
                  background: "linear-gradient(to right, rgb(113, 128, 71), rgb(132, 148, 85))",
                }}
                className="absolute -inset-0.5 rounded-2xl blur"
              />
              
              <div className="relative flex items-center gap-2 p-2 bg-white backdrop-blur-xl border border-stone-200 rounded-2xl shadow-2xl transition-all duration-300 focus-within:border-stone-400 focus-within:shadow-xl">
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Search className="w-5 h-5 text-stone-400 transition-colors duration-300" style={{
                    color: "rgb(168, 162, 158)"
                  }} />
                  <input
                    type="text"
                    placeholder="Search for tenders by keyword, category, or location..."
                    className="w-full bg-transparent text-slate-900 placeholder:text-stone-400 outline-none text-sm sm:text-base py-3 transition-all duration-300"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "linear-gradient(to right, rgb(113, 128, 71), rgb(132, 148, 85))",
                    boxShadow: "0 10px 25px -5px rgba(113, 128, 71, 0.3)",
                  }}
                  className="px-6 py-3 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-xl whitespace-nowrap"
                >
                  Search
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-stone-600"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
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
                className="w-2 h-2 rounded-full"
              />
              <span>10,000+ Active Tenders</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                style={{
                  background: "rgb(113, 128, 71)",
                }}
                className="w-2 h-2 rounded-full"
              />
              <span>AI-Powered Matching</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                style={{
                  background: "rgb(113, 128, 71)",
                }}
                className="w-2 h-2 rounded-full"
              />
              <span>Real-Time Alerts</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}