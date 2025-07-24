import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import React, { JSX } from "react";
import Image from "next/image";

export interface CarouselItem {
  name: string;
  location: string;
  testimonial: string;
  avatar: string;
  signature: string;
  id: number;
}

export interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number | {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    name: "Aishwarya R.",
    location: "3BHK in Anna Nagar, Chennai.",
    testimonial: "They really listened, understood my ideas, and turned them into a space that feels like mine.",
    avatar: "/hero-card/avatar-1.png",
    signature: "/hero-card/signature-3.svg",
    id: 1,
  },
  {
    name: "Kalim M.",
    location: "2BHK in HSR Layout, Bangalore.",
    testimonial: "From planning to execution, the process was seamless. The final design exceeded our expectations.",
    avatar: "/hero-card/avatar-2.png",
    signature: "/hero-card/signature-2.svg",
    id: 2,
  },
  {
    name: "Lan S.",
    location: "4BHK in Jubilee Hills, Hyderabad.",
    testimonial: "They brought our vision to life beautifully. Every detail was taken care of with perfection. I like it.",
    avatar:"/hero-card/avatar-3.png",
    signature: "/hero-card/signature-1.svg",
    id: 3,
  },
];


const useResponsiveWidth = (baseWidth: number | { sm?: number; md?: number; lg?: number; xl?: number }) => {
  const [width, setWidth] = useState<number>(
    typeof baseWidth === 'number' ? baseWidth : baseWidth.lg || 400
  );

  useEffect(() => {
    if (typeof baseWidth === 'number') {
      setWidth(baseWidth);
      return;
    }

    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1280 && baseWidth.xl) {
        setWidth(baseWidth.xl);
      } else if (screenWidth >= 1024 && baseWidth.lg) {
        setWidth(baseWidth.lg);
      } else if (screenWidth >= 768 && baseWidth.md) {
        setWidth(baseWidth.md);
      } else if (screenWidth >= 640 && baseWidth.sm) {
        setWidth(baseWidth.sm);
      } else {
        setWidth(baseWidth.lg || 400);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [baseWidth]);

  return width;
};

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
}: CarouselProps): JSX.Element {
  const responsiveWidth = useResponsiveWidth(baseWidth);
  const containerPadding = 16;
  const itemWidth = responsiveWidth - containerPadding * 2;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse hover for pause functionality
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, items.length, pauseOnHover]);

  const currentItem = items[currentIndex];

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden p-4"
      style={{
        width: `${responsiveWidth}px`,
      }}
    >
      {/* Static Card Container */}
      <div
        className="relative bg-white p-6 lg:p-4 xl:p-6 rounded-2xl drop-shadow-xl border-[1px]"
        style={{
          width: itemWidth,
          minHeight: 260,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Header Section with Avatar and Info */}
        <div className="flex items-center gap-3">
          {/* Animated Avatar */}
          <div className="rounded-full w-10 h-10 xl:w-12 xl:h-12 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.avatar}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Image 
                  width={400}
                  height={400}
                  src={currentItem.avatar} 
                  alt={currentItem.name} 
                  className="rounded-full w-full h-full object-cover" 
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Animated Name and Location */}
          <div>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentItem.name}
                className="font-bold text-sm xl:text-base text-[#010101] font-gtpro"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {currentItem.name}
              </motion.p>
            </AnimatePresence>
            
            <AnimatePresence mode="wait">
              <motion.p
                key={currentItem.location}
                className="text-xs xl:text-sm text-[#868686] font-gtpro"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {currentItem.location}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Animated Testimonial */}
        <div className="">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentItem.testimonial}
              className="text-sm/[26px] xl:text-lg/[26px] text-black font-gtpro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              &quot;{currentItem.testimonial}&quot;
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Animated Signature */}
        <div className="relative w-full flex justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={`signature-${currentItem.id}`} 
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -20 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Image
                width={800}
                height={800}
                src={currentItem.signature}
                alt={`${currentItem.name} signature`}
                className="w-12 lg:w-16 xl:w-18 "
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-0 left-0">
            <div className="flex gap-2">
              {items.map((_, dotIndex) => (
                <motion.div
                  key={dotIndex}
                  className={`size-1.5 xl:size-2 rounded-full cursor-pointer transition-colors duration-150 ${
                    currentIndex === dotIndex
                      ? "bg-black/60"
                      : "bg-gray-300"
                  }`}
                  animate={{
                    scale: currentIndex === dotIndex ? 1.2 : 1,
                  }}
                  onClick={() => setCurrentIndex(dotIndex)}
                  transition={{ duration: 0.15 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
