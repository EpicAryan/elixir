'use client'

import { Project } from '@/utils/projects'
import { projectsData } from '@/utils/projects'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo } from 'react'

interface ProjectNavigationProps {
  currentProject: Project
}

const ProjectNavigation = ({ currentProject }: ProjectNavigationProps) => {
  const { previousProject, nextProject } = useMemo(() => {
    const currentIndex = projectsData.findIndex(project => project.id === currentProject.id)
    
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : projectsData.length - 1
    const nextIndex = currentIndex < projectsData.length - 1 ? currentIndex + 1 : 0
    
    return {
      previousProject: projectsData[prevIndex],
      nextProject: projectsData[nextIndex]
    }
  }, [currentProject.id])

  return (
    <nav className="container mx-auto px-6 lg:px-8 2xl:px-12">
      <div className="lg:px-16">
        <div className="grid grid-cols-2 gap-12 lg:gap-8 border-t border-gray-200 py-6">
          {/* Previous Project */}
          <Link 
            href={`/projects/${previousProject.slug}`}
            className="group flex items-center lg:space-x-1"
          >
            <div className="flex-shrink-0">
              <div className="size-6 lg:size-12 flex items-center justify-center group-hover:-translate-x-2 transition-all duration-300 ease-in-out">
                <ChevronLeft className="size-4 lg:size-5 text-gray-600" />
              </div>
            </div>
            
            <div className="flex-grow min-w-0">
              <p className="text-xs lg:text-sm text-gray-500">Previous</p>
              <h3 className="text-xs lg:text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors truncate">
                {previousProject.title}
              </h3>

            </div>
          </Link>

          {/* Next Project */}
          <Link 
            href={`/projects/${nextProject.slug}`}
            className="group flex items-center lg:space-x-2 flex-row-reverse text-right"
          >
            <div className="flex-shrink-0">
              <div className="size-6 lg:size-12 flex items-center justify-center group-hover:translate-x-2 transition-all duration-300 ease-in-out">
                <ChevronRight className="size-4 lg:size-5 text-gray-600" />
              </div>
            </div>
            
            <div className="flex-grow min-w-0">
              <p className="text-xs lg:text-sm text-gray-500">Next</p>
              <h3 className="text-xs lg:text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors truncate">
                {nextProject.title}
              </h3>
            </div>
          </Link>

        </div>
      </div>
    </nav>
  )
}

export default ProjectNavigation
