
import { useEffect, useState, useRef } from "react";
import { motion, MotionValue, PanInfo, spring, Transition, useMotionValue, useTransform } from "framer-motion";
import React, { JSX  } from "react";
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
  loop?: boolean;
  round?: boolean;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    name: "Aishwarya R.",
    location: "3BHK in Anna Nagar, Chennai.",
    testimonial: "They really listened, understood my ideas, and turned them into a space that feels like mine.",
    avatar: "/Avatar.png",
    signature: "/signature.svg",
    id: 1,
  },
  {
    name: "Rahul M.",
    location: "2BHK in HSR Layout, Bangalore.",
    testimonial: "From planning to execution, the process was seamless. The final design exceeded our expectations.",
    avatar: "/Avatar.png",
    signature: "/signature.svg",
    id: 2,
  },
  {
    name: "Neha S.",
    location: "4BHK in Jubilee Hills, Hyderabad.",
    testimonial: "They brought our vision to life beautifully. Every detail was taken care of with perfection.",
    avatar: "/Avatar.png",
    signature: "/signature.svg",
    id: 3,
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: spring, stiffness: 150, damping: 25 };

interface CarouselItemComponentProps {
  item: CarouselItem;
  index: number;
  itemWidth: number;
  trackItemOffset: number;
  round: boolean;
  x: MotionValue<number>; 
  effectiveTransition: Transition;
}

const CarouselItemComponent: React.FC<CarouselItemComponentProps> = ({
  item,
  index,
  itemWidth,
  trackItemOffset,
  x,
  effectiveTransition,
}) => {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      className="relative shrink-0 bg-white p-6 lg:p-4 xl:p-6 rounded-2xl drop-shadow-xl border-[1px] cursor-grab active:cursor-grabbing"
      style={{
        width: itemWidth,
        height: "auto",
        rotateY: rotateY,
      }}
      transition={effectiveTransition}
    >
      <div className="flex items-center gap-3">
        <Image 
          width={400}
          height={400}
          src={item.avatar} 
          alt={item.name} 
          className="rounded-full w-10 h-10 xl:w-12 xl:h-12" 
        />
        <div>
          <p className="font-bold text-sm xl:text-base text-[#010101] font-gtpro">
            {item.name}
          </p>
          <p className="text-xs xl:text-sm text-[#868686] font-gtpro">
            {item.location}
          </p>
        </div>
      </div>
      <p className="mt-4 lg:mt-2 xl:mt-4 text-sm/[26px] xl:text-lg/[26px] text-black font-gtpro">
        &quot;{item.testimonial}&quot;
      </p>
      <p className="w-full flex justify-end">
        <Image
          width={800}
          height={800}
          src={item.signature}
          alt="signature"
          className="w-40 xl:w-[180px]"
        />
      </p>
    </motion.div>
  );
};

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
  loop = false,
  round = false,
}: CarouselProps): JSX.Element {
  const responsiveWidth = useResponsiveWidth(baseWidth);
  const containerPadding = 16;
  const itemWidth = responsiveWidth  - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  
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

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 `}
      style={{
        width: `${responsiveWidth}px`,
        ...(round && { height: `${responsiveWidth}px` }),
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => (
          <CarouselItemComponent
            key={index}
            item={item}
            index={index}
            itemWidth={itemWidth}
            trackItemOffset={trackItemOffset}
            round={round}
            x={x}
            effectiveTransition={effectiveTransition}
          />
        ))}
      </motion.div>
      <div
        className={`flex w-full justify-center ${
          round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""
        }`}
      >
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % items.length === index
                  ? "bg-white" 
                  : "bg-[rgba(255,255,255,0.4)]" 
              }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
