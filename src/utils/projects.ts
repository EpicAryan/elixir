// data/projects.ts
export interface Project {
  id: string
  title: string
  category: string
  image: string
  slug: string
  description?: string
  year?: string
  client?: string
}

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'Urban City Life',
    category: 'Digital Design',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'urban-city-life',
    description: 'Modern urban apartment design with minimalist aesthetics',
    year: '2024',
    client: 'Private Client'
  },
  {
    id: '2',
    title: 'Case Study',
    category: 'Digital Design',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'case-study',
    description: 'Comprehensive design analysis and implementation',
    year: '2024',
    client: 'Research Institute'
  },
  {
    id: '3',
    title: 'Modern Architecture',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'modern-architecture',
    description: 'Contemporary architectural visualization and branding',
    year: '2024',
    client: 'Architectural Firm'
  },
  {
    id: '4',
    title: 'Prestigious Penthouse',
    category: 'Ecommerce',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'prestigious-penthouse',
    description: 'Luxury penthouse interior with premium finishes',
    year: '2023',
    client: 'Private Developer'
  },
  {
    id: '5',
    title: 'House Renovation',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'house-renovation',
    description: 'Complete residential renovation and rebranding',
    year: '2023',
    client: 'Family Residence'
  },
  {
    id: '6',
    title: 'Refined Elegance',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'refined-elegance',
    description: 'Sophisticated interior design with classical elements',
    year: '2023',
    client: 'Boutique Hotel'
  },
  {
    id: '7',
    title: 'Brooklyn Residence',
    category: 'Custom Print',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'brooklyn-residence',
    description: 'Artistic residential space with custom printed elements',
    year: '2024',
    client: 'Artist Studio'
  },
  {
    id: '8',
    title: 'Corporate Workspace',
    category: 'Digital Design',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'corporate-workspace',
    description: 'Modern office design with digital integration',
    year: '2024',
    client: 'Tech Startup'
  },
  {
    id: '9',
    title: 'Minimal Living',
    category: 'Masonry',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'minimal-living',
    description: 'Minimalist approach with exposed masonry elements',
    year: '2023',
    client: 'Design Enthusiast'
  },
  {
    id: '10',
    title: 'Portfolio Showcase',
    category: 'Portfolio Single',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'portfolio-showcase',
    description: 'Gallery space designed for portfolio presentations',
    year: '2024',
    client: 'Creative Agency'
  },
  {
    id: '11',
    title: 'Luxury Retail Space',
    category: 'Ecommerce',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'luxury-retail-space',
    description: 'High-end retail interior with e-commerce integration',
    year: '2024',
    client: 'Fashion Brand'
  },
  {
    id: '12',
    title: 'Custom Art Installation',
    category: 'Custom Print',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    slug: 'custom-art-installation',
    description: 'Bespoke art pieces with custom printing techniques',
    year: '2023',
    client: 'Art Gallery'
  }
]
