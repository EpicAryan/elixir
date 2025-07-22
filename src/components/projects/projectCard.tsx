'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Project {
  id: string
  title: string
  category: string
  image: string
  slug: string
}

interface ProjectCardProps {
  project: Project
  aspectRatio?: string
}

export function ProjectCard({ project, aspectRatio = "aspect-[4/3]" }: ProjectCardProps) {
  const CIRCLE_SIZE = 48
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 })
  
  const [isHovering, setIsHovering] = useState(false)
  const [hasPointer, setHasPointer] = useState(false) 

  const circleX = useTransform(springX, (value) => value - CIRCLE_SIZE / 2)
  const circleY = useTransform(springY, (value) => value - CIRCLE_SIZE / 2)

  useEffect(() => {
    const checkPointerAndScreen = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches
      const isLargeScreen = window.matchMedia('(min-width: 768px)').matches
      setHasPointer(hasFinePointer && isLargeScreen)
    }

    checkPointerAndScreen()

    const pointerQuery = window.matchMedia('(pointer: fine)')
    const screenQuery = window.matchMedia('(min-width: 768px)')
    
    const handlePointerChange = () => checkPointerAndScreen()
    
    pointerQuery.addListener(handlePointerChange)
    screenQuery.addListener(handlePointerChange)

    return () => {
      pointerQuery.removeListener(handlePointerChange)
      screenQuery.removeListener(handlePointerChange)
    }
  }, [])

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!hasPointer) return 
    
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - rect.left)
    mouseY.set(event.clientY - rect.top)
  }

  function handleMouseLeave() {
    if (!hasPointer) return 
    setIsHovering(false)
  }

  function handleMouseEnter() {
    if (!hasPointer) return 
    setIsHovering(true)
  }

  return (
    <motion.div
      className="group cursor-pointer h-full"
      whileHover={hasPointer ? { y: -8 } : {}}
      transition={hasPointer ? { duration: 0.3, ease: "easeOut" } : {}}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        {/* Image Container */}
        <div 
          className={`relative ${aspectRatio} overflow-hidden bg-gray-100 rounded-lg shadow-sm ${
            hasPointer ? 'group-hover:shadow-xl' : ''
          } transition-shadow duration-300 mb-6`}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Image */}
          <motion.div
            className="absolute inset-0"
            // Conditionally apply image scale animation
            whileHover={hasPointer ? { scale: 1.05 } : {}}
            transition={hasPointer ? { duration: 0.4, ease: "easeOut" } : {}}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {hasPointer && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center overflow-hidden"
              initial={false}
            >
              {/* Expanding circle from center */}
              <motion.div
                className="absolute rounded-full bg-neutral-900/90"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: isHovering ? 20 : 0,
                  opacity: isHovering ? 1 : 0
                }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeOut",
                  opacity: { duration: 0.3 }
                }}
                style={{
                  width: '40px',
                  height: '40px',
                }}
              />
              
              {/* Arrow icon */}
              <motion.div
                className="relative z-10"
                initial={{ x: -20, opacity: 0 }}
                animate={isHovering ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 20, 
                  delay: isHovering ? 0.1 : 0
                }}
              >
                <ArrowRight className="size-16 text-white" />
              </motion.div>
            </motion.div>
          )}

          {hasPointer && (
            <motion.div
              className="absolute rounded-full border border-white flex items-center justify-center pointer-events-none z-20"
              style={{
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
                translateX: circleX,
                translateY: circleY,
              }}
              animate={{
                scale: isHovering ? 1 : 1.2,
                opacity: isHovering ? 1 : 0,
                borderWidth: isHovering ? 1 : 1,
              }}
              transition={{ 
                scale: { type: "spring", stiffness: 400, damping: 25 },
                opacity: { duration: 0.2 },
                borderWidth: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="text-white text-2xl leading-none select-none"
                animate={{
                  scale: isHovering ? 1 : 1.2,
                }}
                transition={{ 
                  scale: { duration: 0.2 }
                }}
              >
                +
              </motion.div>
            </motion.div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-medium text-black tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm text-gray-500 font-light">
            {project.category}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
