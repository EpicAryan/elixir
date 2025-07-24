'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Card, CardContent } from "../ui/card"
import { Project } from '@/utils/projects'
import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"
import type { CarouselApi } from "@/components/ui/carousel"

interface Props {
  project: Project
}

const ProjectGallery = ({ project }: Props) => {
  const images = project.images ?? [project.image]
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const [showCursor, setShowCursor] = useState(false)
  const [isGrabbing, setIsGrabbing] = useState(false)
  const [hasPointer, setHasPointer] = useState(false)
  
  const cursorRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number | null>(null)
  
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkPointerAndScreen = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches
      const isLargeScreen = window.matchMedia('(min-width: 768px)').matches
      setHasPointer(hasFinePointer && isLargeScreen)
    }

    checkPointerAndScreen()
    const mediaQuery = window.matchMedia('(pointer: fine)')
    mediaQuery.addEventListener('change', checkPointerAndScreen)
    return () => mediaQuery.removeEventListener('change', checkPointerAndScreen)
  }, [])

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  const animateCursor = useCallback(() => {
    if (!cursorRef.current) return

    const lerpFactor = 0.15
    cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, lerpFactor)
    cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, lerpFactor)

    cursorRef.current.style.transform = `translate3d(${cursorPos.current.x - 32}px, ${cursorPos.current.y - 32}px, 0) scale(${isGrabbing ? 0.85 : 1})`

    animationFrameId.current = requestAnimationFrame(animateCursor)
  }, [isGrabbing])

  useEffect(() => {
    if (showCursor && hasPointer) {
      cursorPos.current = { x: mousePos.current.x, y: mousePos.current.y }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x - 32}px, ${cursorPos.current.y - 32}px, 0) scale(1)`
        cursorRef.current.style.opacity = '1'
      }
      animationFrameId.current = requestAnimationFrame(animateCursor)
    } else {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0'
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [showCursor, hasPointer, animateCursor])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!hasPointer) return
    mousePos.current = { x: e.clientX, y: e.clientY }
  }, [hasPointer])

  const handleMouseEnter = useCallback(() => {
    if (!hasPointer) return
    setShowCursor(true)
    document.body.style.cursor = 'none'
  }, [hasPointer])

  const handleMouseLeave = useCallback(() => {
    if (!hasPointer) return
    setShowCursor(false)
    setIsGrabbing(false)
    document.body.style.cursor = 'auto'
  }, [hasPointer])

  const handleMouseDown = useCallback(() => {
    if (!hasPointer) return
    setIsGrabbing(true)
  }, [hasPointer])

  const handleMouseUp = useCallback(() => {
    if (!hasPointer) return
    setIsGrabbing(false)
  }, [hasPointer])

  return (
    <>
      {hasPointer && (
        <div
          ref={cursorRef}
          className="fixed pointer-events-none z-50 w-16 h-16 will-change-transform hidden md:block"
          style={{
            left: 0,
            top: 0,
            transformOrigin: 'center',
            opacity: 0, // Start invisible
            transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-out'
          }}
        >
          <div className="relative w-16 h-16 rounded-full bg-black text-white text-xs font-semibold flex items-center justify-center">
            DRAG
          </div>
          <div className={`absolute top-1/2 -left-7 -translate-y-1/2 w-3 h-3 bg-black/80 rounded-full flex items-center justify-center transition-all duration-200 ease-out will-change-transform ${isGrabbing ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-r-[4px] border-t-transparent border-b-transparent border-r-white ml-[-1px]" />
          </div>
          <div className={`absolute top-1/2 -right-7 -translate-y-1/2 w-3 h-3 bg-black/80 rounded-full flex items-center justify-center transition-all duration-200 ease-out will-change-transform ${isGrabbing ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[4px] border-t-transparent border-b-transparent border-l-white mr-[-1px]" />
          </div>
        </div>
      )}

      <div className="w-full mx-auto mt-10">
        <div
          ref={carouselRef}
          className="h-[28vh] lg:h-[40vh] xl:h-[50vh] overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4 lg:-ml-8">
              {images.map((img, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 lg:pl-8 basis-4/5 md:basis-1/2 lg:basis-3/5"
                >
                  <div className="relative group">
                    <Card className="border-none p-0 overflow-hidden rounded-none">
                      <CardContent className="p-0">
                        <div className="relative aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-none">
                          <Image
                            width={1000}
                            height={800}
                            src={img}
                            alt={`${project.title} - ${index + 1}`}
                            className="object-cover w-full h-full"
                            draggable={false}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                index === current
                  ? 'bg-gray-700 w-4'
                  : 'bg-gray-400 hover:bg-gray-600'
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default ProjectGallery
