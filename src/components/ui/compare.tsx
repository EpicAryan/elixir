"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CompareProps {
  firstImage?: string;
  secondImage?: string;
  className?: string;
  firstImageClassName?: string;
  secondImageClassname?: string;
  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
  enableViewAnimation?: boolean;
  viewAnimationDuration?: number;
  animationEndPercentage?: number;
}

export const Compare = ({
  firstImage = "",
  secondImage = "",
  className,
  firstImageClassName,
  secondImageClassname,
  slideMode = "hover",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
  enableViewAnimation = true,
  viewAnimationDuration = 3000,
  animationEndPercentage = 75,
}: CompareProps) => {
  const [sliderXPercent, setSliderXPercent] = useState(100); 
  const [isDragging, setIsDragging] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isViewAnimating, setIsViewAnimating] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const setupObserver = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated && enableViewAnimation) {
              startViewAnimation();
            }
          });
        },
        {
          threshold: 0.3, 
          rootMargin: '0px 0px -50px 0px' 
        }
      );

      if (sliderRef.current) {
        observerRef.current.observe(sliderRef.current);
      }
    };

    setupObserver();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasAnimated, enableViewAnimation]);


  const startViewAnimation = useCallback(() => {
    if (isViewAnimating || hasAnimated) return;

    setIsViewAnimating(true);
    
    const startTime = performance.now();
    const startValue = 100;
    const endValue = animationEndPercentage;
    const duration = viewAnimationDuration;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutCubic = (t: number) => {
        return 1 - Math.pow(1 - t, 3);
      };

      const easedProgress = easeOutCubic(progress);
      const currentValue = startValue + (endValue - startValue) * easedProgress;

      setSliderXPercent(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        console.log("Animation complete"); 
        setIsViewAnimating(false);
        setHasAnimated(true);
        setSliderXPercent(endValue); 
      }
    };

    requestAnimationFrame(animate);
  }, [isViewAnimating, hasAnimated, animationEndPercentage, viewAnimationDuration]);

  const startAutoplay = useCallback(() => {
    if (!autoplay || isViewAnimating || !hasAnimated) return;

    const startTime = Date.now();
    const animate = () => {
      if (isViewAnimating) return;
      
      const elapsedTime = Date.now() - startTime;
      const progress = (elapsedTime % (autoplayDuration * 2)) / autoplayDuration;
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;

      setSliderXPercent(percentage);
      autoplayRef.current = setTimeout(animate, 16);
    };

    animate();
  }, [autoplay, autoplayDuration, isViewAnimating, hasAnimated]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (hasAnimated && !isViewAnimating) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay, isViewAnimating, hasAnimated]);

  function mouseEnterHandler() {
    if (!isViewAnimating) {
      stopAutoplay();
    }
  }

  function mouseLeaveHandler() {
    if (slideMode === "hover" && !isViewAnimating && hasAnimated) {
      setSliderXPercent(animationEndPercentage);
    }
    if (slideMode === "drag") {
      setIsDragging(false);
    }
    if (!isViewAnimating && hasAnimated) {
      startAutoplay();
    }
  }

  const handleStart = useCallback(() => {
    if (slideMode === "drag" && !isViewAnimating && hasAnimated) {
      setIsDragging(true);
    }
  }, [slideMode, isViewAnimating, hasAnimated]);

  const handleEnd = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(false);
    }
  }, [slideMode]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current || isViewAnimating || !hasAnimated) return;
      if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = (x / rect.width) * 100;
        requestAnimationFrame(() => {
          setSliderXPercent(Math.max(0, Math.min(100, percent)));
        });
      }
    },
    [slideMode, isDragging, isViewAnimating, hasAnimated]
  );

  const handleMouseDown = useCallback(() => handleStart(), [handleStart]);
  const handleMouseUp = useCallback(() => handleEnd(), [handleEnd]);
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => handleMove(e.clientX),
    [handleMove]
  );

  const handleTouchStart = useCallback(() => {
    if (!autoplay && !isViewAnimating && hasAnimated) {
      handleStart();
    }
  }, [handleStart, autoplay, isViewAnimating, hasAnimated]);

  const handleTouchEnd = useCallback(() => {
    if (!autoplay) {
      handleEnd();
    }
  }, [handleEnd, autoplay]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!autoplay && !isViewAnimating && hasAnimated) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove, autoplay, isViewAnimating, hasAnimated]
  );

  return (
    <div
      ref={sliderRef}
      className={cn("w-[400px] h-[400px] overflow-hidden", className)}
      style={{
        position: "relative",
        cursor: isViewAnimating ? "default" : slideMode === "drag" ? "grab" : "col-resize",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <AnimatePresence initial={false}>
        <motion.div
          className="h-full w-px absolute top-0 m-auto z-30 bg-gradient-to-b from-transparent from-[5%] to-[95%] via-indigo-500 to-transparent"
          style={{
            left: `${sliderXPercent}%`,
            top: "0",
            zIndex: 40,
          }}
          transition={{ duration: 0 }}
        >
          <div className="w-36 h-full [mask-image:radial-gradient(100px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-indigo-400 via-transparent to-transparent z-20 opacity-50" />
          <div className="w-10 h-1/2 [mask-image:radial-gradient(50px_at_left,white,transparent)] absolute top-1/2 -translate-y-1/2 left-0 bg-gradient-to-r from-cyan-400 via-transparent to-transparent z-10 opacity-100" />
          <div className="w-10 h-3/4 top-1/2 -translate-y-1/2 absolute -right-10 [mask-image:radial-gradient(100px_at_left,white,transparent)]">
            <MemoizedSparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>
          {showHandlebar && (
            <div className={cn(
              "h-8 w-8 sm:h-12 sm:w-12 rounded-md sm:rounded-xl top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white z-30 absolute flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40] transition-all duration-300",
              isViewAnimating ? "opacity-50" : "hover:bg-gray-200 active:gap-2 active:bg-gray-200"
            )}>
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="overflow-hidden w-full h-full relative z-20 pointer-events-none">
        <AnimatePresence initial={false}>
          {firstImage ? (
            <motion.div
              className={cn(
                "absolute inset-0 z-20 rounded-2xl shrink-0 w-full h-full select-none overflow-hidden",
                firstImageClassName
              )}
              style={{
                clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
              }}
              transition={{ duration: 0 }}
            >
              <img
                alt="first image"
                src={firstImage}
                className={cn(
                  "absolute inset-0 z-20 rounded-2xl shrink-0 w-full h-full select-none",
                  firstImageClassName
                )}
                draggable={false}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {secondImage ? (
          <motion.img
            className={cn(
              "absolute top-0 left-0 z-[19] rounded-2xl w-full h-full select-none",
              secondImageClassname
            )}
            alt="second image"
            src={secondImage}
            draggable={false}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const MemoizedSparklesCore = React.memo(SparklesCore);
