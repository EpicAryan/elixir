// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { projectsData } from '@/utils/projects'
import { ProjectDetail } from '@/components/projects/projectDetail'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = projectsData.find(p => p.slug === slug)
  
  if (!project) {
    return {
      title: 'Project Not Found'
    }
  }

  return {
    title: project.title,
    description: project.description,
  }
}

export default async  function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projectsData.find(p => p.slug === slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}
