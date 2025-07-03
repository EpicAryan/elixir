'use client'

import { easeOut, motion, useInView } from 'framer-motion'
import { PostCard } from './postCard'
import type { Post } from '../../../@types/content'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useRef } from 'react';

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
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.5,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };
  return (
    <div ref={ref} className="mx-auto max-w-7xl px-4 lg:px-16 2xl:px-8 mb-8 md:mb-16">
      <motion.div
        className="container mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.p
          className="text-xs sm:text-sm text-[#AF7B5B] font-semibold sm:tracking-wider font-gtpro text-center"
          variants={itemVariants}
        >
          SERIOUS ABOUT DESIGN, FUN ABOUT EVERYTHING ELSE.
        </motion.p>

        <motion.h2
          className="text-2xl sm:text-4xl md:text-5xl font-semibold text-gray-800 mt-2 font-gtpro text-center"
          variants={itemVariants}
        >
          Stay in the{' '}
          <span className="relative inline-block">
            know
            {/* Animated SVG underline */}
            <motion.svg
              width="157"
              height="6"
              viewBox="0 0 157 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-1 left-0 w-full h-auto"
            >
              <motion.path
                d="M1 4.98631C1 4.98631 34.91 0.947199 56.6647 1.00052C77.6993 1.05208 89.4501 5.26996 110.484 4.98631C128.279 4.74635 156 1.00052 156 1.00052"
                stroke="#F2672D"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </motion.svg>
          </span>
        </motion.h2>
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
