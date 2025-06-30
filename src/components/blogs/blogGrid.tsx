'use client'

import { easeOut, motion } from 'framer-motion'
import { PostCard } from './postCard'
import type { Post } from '../../../@types/content'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Link from 'next/link'
import { Button } from '../ui/button'

type HomePagePost = Pick<Post, '_id' | 'title' | 'slug' | 'mainImage' | 'publishedAt'> & {
  author: { name: string; image?: SanityImageSource }
  category: { title: string }
}

const cardAnimationVariants = {
  fromLeft: {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: easeOut } },
  },
  fadeIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
  },
  fromRight: {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: easeOut } },
  },
  fromBottom: {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: easeOut } },
  },
}


const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, 
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


export const BlogGrid = ({ posts }: { posts: HomePagePost[] }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-16 2xl:px-8">
      <motion.div 
        className="mx-auto max-w-2xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{  amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }} 
      >
        <motion.h2
          variants={fadeUpVariant}
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl font-gtpro"
        >
          From Our Blog
        </motion.h2>
        <motion.p
          variants={fadeUpVariant}
          className="mt-1 text-sm leading-8 text-gray-600 font-gtpro sm:text-lg"
        >
          Insights, updates, and stories from our team.
        </motion.p>
      </motion.div>

      <motion.div
        className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 sm:mt-16 sm:gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
      >
        {posts.map((post, index) => {
          const variantKey = ['fromLeft', 'fadeIn', 'fromRight'][index % 3];
          const finalVariants = index >= 3 ? cardAnimationVariants.fromBottom : cardAnimationVariants[variantKey as keyof typeof cardAnimationVariants];
          
          return (
            <motion.div key={post._id} variants={finalVariants}>
              <PostCard post={post} />
            </motion.div>
          )
        })}
      </motion.div>

      {/* 3. Animate the Button */}
      <motion.div 
        className="mt-12 text-center sm:mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUpVariant}
        transition={{ delay: 0.4 }} 
      >
        <Link href="/blog">
          <Button
            variant="outline"
            className="cursor-pointer px-6 text-xs text-gray-500 sm:py-5 sm:text-base"
          >
            View all posts
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
