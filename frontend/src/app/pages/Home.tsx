import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { TenderCard } from "../components/TenderCard";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { motion } from "motion/react";

const mockTenders = [
  {
    title: "Cloud Infrastructure Modernization for Defense Operations",
    matchScore: 95,
    insight:
      "Strong alignment with your cloud migration expertise and defense sector certifications. High win probability based on past projects.",
    deadline: "Mar 15, 2026",
    department: "Department of Defense",
    value: "$2.4M",
  },
  {
    title: "AI-Powered Healthcare Data Analytics Platform",
    matchScore: 92,
    insight:
      "Matches your AI/ML capabilities and healthcare compliance experience. Competitive landscape shows favorable positioning.",
    deadline: "Mar 22, 2026",
    department: "Health & Human Services",
    value: "$1.8M",
  },
  {
    title: "Cybersecurity Assessment and Penetration Testing Services",
    matchScore: 89,
    insight:
      "Your cybersecurity certifications and government clearances provide significant competitive advantage for this contract.",
    deadline: "Apr 5, 2026",
    department: "Homeland Security",
    value: "$950K",
  },
  {
    title: "Digital Transformation Consulting for Public Transportation",
    matchScore: 87,
    insight:
      "Relevant to your transportation sector experience. Medium competition with opportunities for innovative solutions.",
    deadline: "Apr 12, 2026",
    department: "Dept. of Transportation",
    value: "$1.2M",
  },
  {
    title: "Enterprise Resource Planning System Implementation",
    matchScore: 84,
    insight:
      "Aligns with your ERP implementation track record. Consider highlighting case studies from similar government projects.",
    deadline: "Apr 18, 2026",
    department: "General Services Admin",
    value: "$3.1M",
  },
  {
    title: "Renewable Energy Infrastructure Planning & Development",
    matchScore: 81,
    insight:
      "Emerging opportunity in your portfolio. Partnership with certified energy consultants could strengthen your proposal.",
    deadline: "May 2, 2026",
    department: "Dept. of Energy",
    value: "$2.7M",
  },
];

export function Home() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Animated Background Layer */}
      <AnimatedBackground />
      
      <div className="relative z-10">
        <Navbar />
        <Hero />

        {/* Recommended Tenders Section */}
        <section className="py-16 sm:py-20 lg:py-24 relative">
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Recommended Tenders
              </h2>
              <p className="text-lg text-slate-600">
                Curated opportunities matched to your business profile and
                capabilities using advanced AI algorithms.
              </p>
            </motion.div>

            {/* Tender Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTenders.map((tender, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: index * 0.1,
                  }}
                >
                  <TenderCard {...tender} />
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              className="mt-12 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 text-sm font-medium text-white bg-white border border-stone-300 rounded-xl transition-all duration-200 shadow-lg"
                style={{
                  background: "linear-gradient(to right, rgb(113, 128, 71), rgb(132, 148, 85))",
                  color: "white",
                }}
              >
                Load More Tenders
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-stone-200 bg-white/80 backdrop-blur-sm py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-stone-600">
                © 2026 TenderAI. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-stone-600">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  href="#"
                  className="hover:opacity-80 transition-opacity duration-200"
                  style={{ color: "rgb(113, 128, 71)" }}
                >
                  Privacy Policy
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  href="#"
                  className="hover:opacity-80 transition-opacity duration-200"
                  style={{ color: "rgb(113, 128, 71)" }}
                >
                  Terms of Service
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  href="#"
                  className="hover:opacity-80 transition-opacity duration-200"
                  style={{ color: "rgb(113, 128, 71)" }}
                >
                  Contact
                </motion.a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}