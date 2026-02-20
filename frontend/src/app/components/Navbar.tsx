import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-lg border-b border-stone-200"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 10px rgba(113, 128, 71, 0.3)",
                  "0 0 20px rgba(113, 128, 71, 0.5)",
                  "0 0 10px rgba(113, 128, 71, 0.3)",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              style={{
                background: "linear-gradient(135deg, rgb(113, 128, 71), rgb(132, 148, 85))",
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-semibold text-transparent bg-clip-text" style={{
              backgroundImage: "linear-gradient(to right, rgb(113, 128, 71), rgb(132, 148, 85))"
            }}>
              TenderAI
            </span>
          </motion.div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900 transition-colors duration-200"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "linear-gradient(to right, rgb(113, 128, 71), rgb(132, 148, 85))",
              }}
              className="px-5 py-2 text-sm font-medium text-white hover:opacity-90 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Register
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}