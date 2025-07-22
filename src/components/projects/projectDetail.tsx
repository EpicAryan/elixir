// components/projects/projectDetail.tsx
'use client'
import { Project } from '@/utils/projects'
import ProjectHero from './projectHero'
import ProjectGallery from './projectGallery'
import ProjectCTA from './projectCTA'
import ProjectNavigation from './projectNavigation'

interface Props {
  project: Project
}

export function ProjectDetail({ project }: Props) {
  return (
    <main 
      className="min-h-screen py-20"
    >
        <ProjectHero project={project}/>
        <ProjectGallery project={project}/>
        <ProjectCTA/>
        <ProjectNavigation currentProject={project} />
    </main>
  )
}
