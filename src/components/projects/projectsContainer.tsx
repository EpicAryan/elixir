// components/projects/projectsContainer.tsx
'use client'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { ProjectHeader } from './projectHeader'
import { FilterTabs } from './filterTabs'
import { ProjectGrid } from './projectGrid'
import { LoadMoreButton } from './loadMoreButton'
import { projectsData } from '@/utils/projects'

interface Project {
  id: string
  title: string
  category: string
  image: string
  slug: string
}

const categories = [
  'All',
  'Branding', 
  'Custom Print',
  'Digital Design',
  'Ecommerce',
  'Masonry',
  'Portfolio Single'
]

export function ProjectsContainer() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [displayCount, setDisplayCount] = useState(6)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const filtered = activeFilter === 'All' 
      ? projectsData  
      : projectsData .filter(project => project.category === activeFilter)
    setFilteredProjects(filtered)
    setDisplayCount(6) 
  }, [activeFilter])

  const loadMore = () => {
    setLoading(true)
    setTimeout(() => {
      setDisplayCount(prev => prev + 6)
      setLoading(false)
    }, 500)
  }

  return (
    <motion.div 
      className="container mx-auto px-6 sm:px-7 lg:px-9 2xl:px-13 2xl:max-w-7xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <ProjectHeader />
      <FilterTabs 
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <ProjectGrid 
        projects={filteredProjects.slice(0, displayCount)}
      />
      {displayCount < filteredProjects.length && (
        <LoadMoreButton 
          onClick={loadMore}
          loading={loading}
        />
      )}
    </motion.div>
  )
}
