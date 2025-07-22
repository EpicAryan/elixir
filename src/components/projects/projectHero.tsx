'use client'

import { Project } from '@/utils/projects'
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaLinkedinIn   } from "react-icons/fa";

interface Props {
  project: Project
}

const ProjectHero = ({ project }: Props) => {
  return (
    <section className="container mx-auto px-6 lg:px-9 2xl:px-13 mt-10 lg:mt-16">
        <div className="flex flex-col lg:flex-row lg:justify-between space-y-4 lg:space-y-0">
            <div className='w-full lg:max-w-lg xl:max-w-2xl flex flex-col space-y-4 text-center lg:text-left'>
                <span className='text-gray-400 font-semibold xl:text-lg font-gtpro'>{project.category}</span>
                <h1 className='text-4xl lg:text-5xl xl:text-6xl font-bold font-manrope'>{project.title}</h1>
                <p className='text-sm lg:text-base xl:text-xl font-gtpro'>{project.description}</p>
            </div>
            <div className='max-w-2xl flex flex-end justify-around lg:pr-20 xl:pr-40 lg:space-x-20 items-center'>
                <div className='flex flex-col gap-4 font-gtpro'>
                  <div>
                    <span className='text-sm lg:text-base text-gray-400'>Client</span>
                    <h4 className='text-sm lg:text-base'>LiquidTeams</h4>
                  </div>
                  <div>
                    <span className='text-sm lg:text-base text-gray-400'>Date</span>
                    <h4 className='text-sm lg:text-base'>2020</h4>
                  </div>
                </div>
                <div className='flex flex-col gap-4'>
                  <div>
                    <span className='text-sm lg:text-base text-gray-400'>Role</span>
                    <h4 className='text-sm lg:text-base'>Architecture</h4>
                  </div>
                  <div>
                    <span className='text-sm lg:text-base text-gray-400'>Share</span>
                    <div className='flex text-sm lg:text-base gap-4 mt-1 '>
                        <Link href='#'>
                          <FaFacebookF className='transition-transform duration-300 hover:scale-105 cursor-pointer' />
                        </Link>
                        <Link href='#'>
                          <FaTwitter className='transition-transform duration-300 hover:scale-105 cursor-pointer' />
                        </Link>
                        <Link href='#'>
                          <FaLinkedinIn className='transition-transform duration-300 hover:scale-105 cursor-pointer' />
                        </Link>
                    </div>
                  </div>
                  
                </div>
            </div>
        </div>
    </section>
  )
}

export default ProjectHero
