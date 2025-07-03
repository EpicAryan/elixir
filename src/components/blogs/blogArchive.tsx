'use client'

import { easeOut, motion } from 'framer-motion'
import { PostCard } from './postCard'
import type { Post } from '../../../@types/content' 
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'


type ArchivePagePost = Pick<Post, '_id' | 'title' | 'slug' | 'mainImage' | 'publishedAt' | 'description' | 'readingTime'> & {
  author: { name: string; image?: SanityImageSource }
  category: { title: string }
}


const cardAnimationVariants = {
  fromLeft: {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: easeOut } },
  },
  fadeIn: {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
  },
  fromRight: {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: easeOut } },
  },
}

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, 
    },
  },
}

const fadeUpVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
}


export const BlogArchive = ({ posts }: { posts: ArchivePagePost[] }) => {
  return (
    <section className="bg-white py-16 sm:py-24 mt-4 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        
        {/* Animated Title */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.h2 
            variants={fadeUpVariant} 
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl font-gtpro"
          >
            All Blog Posts
          </motion.h2>
          <motion.p 
            variants={fadeUpVariant} 
            className="mt-2 text-lg leading-8 text-gray-600 font-manrope"
          >
            Explore our complete collection of insights and stories.
          </motion.p>
        </motion.div>

        {/* Animated Grid */}
        <motion.div
          className="mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8  max-w-xs sm:max-w-3xl lg:max-w-6xl"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{  amount: 0.1 }}
        >
          {posts.map((post, index) => {
            const variantKey = ['fromLeft', 'fadeIn', 'fromRight'][index % 3];
            const finalVariants = cardAnimationVariants[variantKey as keyof typeof cardAnimationVariants];

            return (
              <motion.div key={post._id} variants={finalVariants} className="w-full">
                <PostCard post={post} />
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
