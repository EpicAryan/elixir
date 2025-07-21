// components/projects/projectHeader.tsx
import { motion } from 'motion/react'

export function ProjectHeader() {
  return (
    <motion.div 
      className="mb-18 pt-28 md:pt-40"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <motion.div 
        className="inline-block px-4 py-0.5 bg-black text-white text-sm font-medium rounded-full mb-8"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        OUR WORKS
      </motion.div>
      <h1 className="text-6xl md:text-8xl font-light text-black">
        <span className="italic font-playfair_display font-semibold">Recent</span>
        <br />
        <span className="font-medium font-gtpro">Projects</span>
      </h1>
    </motion.div>
  )
}
