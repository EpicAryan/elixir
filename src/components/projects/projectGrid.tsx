import { AnimatePresence, motion } from 'motion/react'
import { ProjectCard } from './projectCard'

interface Project {
  id: string
  title: string
  category: string
  image: string
  slug: string
}

interface ProjectGridProps {
  projects: Project[]
}

const getVariedHeight = (index: number): string => {
  const heights = [
    "h-[240px] md:h-[280px] lg:h-[320px]",
    "h-[360px] md:h-[400px] lg:h-[560px]", 
    "h-[300px] md:h-[320px] lg:h-[400px]",
  ]
  return heights[index % heights.length]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-8 mb-16">
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ 
              duration: 0.5,
              delay: Math.min(index * 0.08, 1.2),
              layout: { duration: 0.4 }
            }}
            className="break-inside-avoid mb-8 w-full"
          >
            <ProjectCard 
              project={project}
              aspectRatio={getVariedHeight(index)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
