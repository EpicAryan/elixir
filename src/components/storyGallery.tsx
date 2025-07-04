"use client";

import React, { useRef, useState } from "react";
import { easeInOut, easeOut, motion, useInView } from "motion/react";
import Image from "next/image";
import { Pause } from "lucide-react";

const topRowImages = [
  "/gallery/story-1.jpg",
  "/gallery/story-2.png",
  "/gallery/story-3.png",
  "/gallery/story-4.png",
  "/gallery/story-5.png",
  "/gallery/story-6.png",
];

const bottomRowImages = [
  "/gallery/story-7.png",
  "/gallery/story-8.jpg",
  "/gallery/story-9.jpg",
  "/gallery/story-10.jpg",
  "/gallery/story-11.jpg",
];

const InfiniteScrollStyles = () => (
  <style jsx global>{`
    @keyframes scroll-left {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }
    @keyframes scroll-right {
      from {
        transform: translateX(-50%);
      }
      to {
        transform: translateX(0);
      }
    }
    .animate-scroll-left {
      animation: scroll-left 40s linear infinite;
    }
    .animate-scroll-right {
      animation: scroll-right 40s linear infinite;
    }
    
    /* Pause animation on hover */
    .animate-scroll-left:hover {
      animation-play-state: paused;
    }
    .animate-scroll-right:hover {
      animation-play-state: paused;
    }
  `}</style>
);

// --- Wavy Underline SVG Component ---
const WavyUnderline = ({ isInView }: { isInView: boolean }) => (
  <svg 
    width="233" 
    height="23" 
    viewBox="0 0 233 23" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="mt-1 w-[140px] sm:w-[190px] md:w-[230px] h-auto"
  >
    <motion.path d="M2 17.2007C33.6667 11.7007 97.7 1.40072 100.5 4.20072C104 7.70072 85.5 18.1999 92 20.1999C98.5 22.1999 161 -3.80014 162.5 3.19986C164 10.1999 149.5 13.6985 154 20.1999C158.5 26.7012 193 0.201172 231 5.20117" 
      stroke="#FF824C" 
      strokeWidth="3" 
      strokeLinecap="round"
      initial={{pathLength: 0}}
      animate={{ pathLength: isInView ? 1 : 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: easeInOut}}
    />
  </svg>
);

// --- Main Gallery Section Component ---
export function StoryGallerySection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeOut } },
  };

  const renderImageRow = (images: string[], animationClass: string, rowId: string) => (
    <div className="w-full overflow-hidden z-20">
      <div className={`flex w-max ${animationClass}`}>
        {[...images, ...images].map((src, index) => {
          const cardId = `${rowId}-${index}`;
          const isHovered = hoveredCard === cardId;
          
          return (
            <div 
              key={index} 
              className="flex-shrink-0 w-[80vw] sm:w-[80vw] md:w-[50vw] lg:w-[40vw] px-1 relative group"
              onMouseEnter={() => setHoveredCard(cardId)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative aspect-[16/9] w-full h-full overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={`Interior design gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 20vw"
                />
                
                {/* Overlay on hover */}
                <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                
                {/* Pause Icon */}
                {isHovered && (
                  <motion.div
                    className="absolute top-3 right-3 w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Pause className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="bg-white pt-20 sm:pt-28 overflow-hidden">
      {/* Inject the custom animation styles into the page */}
      <InfiniteScrollStyles />

      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col items-center text-center mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.p variants={itemVariants} className="text-[10px] md:text-xs font-semibold tracking-wider sm:tracking-[0.2em] uppercase text-[#AF7B5B] font-gtpro mb-1">
            WE BRING THE WOW (AND THE WHERE DID YOU GET THAT?).
          </motion.p>
          <motion.div variants={itemVariants} className="relative inline-block mt-2">
            <motion.h2 className="text-2xl sm:text-[40px] md:text-5xl font-bold text-gray-900 font-gtpro tracking-wide">
              Designs that tell your story
            </motion.h2>
            <motion.div
              className="absolute -right-2"
              variants={itemVariants}
            >
              <WavyUnderline isInView={isInView} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-2">
        {renderImageRow(topRowImages, "animate-scroll-left", "top-row")}
        {renderImageRow(bottomRowImages, "animate-scroll-right", "bottom-row")}
      </div>
    </section>
  );
}
